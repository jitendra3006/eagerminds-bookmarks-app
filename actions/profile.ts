"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getCurrentProfile, requireUser } from "@/lib/auth";
import { getErrorMessage } from "@/lib/errors";
import { ensureProfileExists } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { profileSchema } from "@/lib/validation";
import type { ProfileFormState } from "@/types/actions";
import type { Bookmark, Profile } from "@/types/database";

export async function recoverMissingProfile(
  _prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const user = await requireUser();
  const existingProfile = await getCurrentProfile();

  if (existingProfile) {
    redirect("/bookmarks");
  }

  const parsed = profileSchema.safeParse({
    handle: formData.get("handle"),
    fullName: formData.get("fullName"),
  });

  if (!parsed.success) {
    const fieldErrors: ProfileFormState["fieldErrors"] = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "handle") {
        fieldErrors.handle = issue.message;
      }
      if (field === "fullName") {
        fieldErrors.full_name = issue.message;
      }
    }

    return {
      error: parsed.error.issues[0]?.message ?? "Invalid form data.",
      fieldErrors,
    };
  }

  const supabase = await createClient();
  const profileResult = await ensureProfileExists(supabase, {
    userId: user.id,
    email: user.email ?? "",
    handle: parsed.data.handle,
    fullName: parsed.data.fullName,
  });

  if (profileResult.error) {
    return { error: profileResult.error };
  }

  revalidatePath("/", "layout");
  redirect("/bookmarks");
}

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const user = await requireUser();
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    redirect("/complete-profile");
  }

  const parsed = profileSchema.safeParse({
    handle: formData.get("handle"),
    fullName: formData.get("fullName"),
  });

  if (!parsed.success) {
    const fieldErrors: ProfileFormState["fieldErrors"] = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === "handle") {
        fieldErrors.handle = issue.message;
      }
      if (field === "fullName") {
        fieldErrors.full_name = issue.message;
      }
    }

    return {
      error: parsed.error.issues[0]?.message ?? "Invalid form data.",
      fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      handle: parsed.data.handle,
      full_name: parsed.data.fullName,
    })
    .eq("id", user.id);

  if (error) {
    return {
      error: getErrorMessage(error, "Unable to update profile."),
    };
  }

  revalidatePath("/settings");
  revalidatePath(`/${currentProfile.handle}`);
  revalidatePath(`/${parsed.data.handle}`);

  return { error: undefined, fieldErrors: undefined };
}

export async function getProfileByHandle(
  handle: string,
): Promise<Profile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("handle", handle)
    .maybeSingle();

  if (error) {
    throw new Error(getErrorMessage(error, "Unable to load profile."));
  }

  return data;
}

export async function getPublicBookmarksByUserId(
  userId: string,
): Promise<Bookmark[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(getErrorMessage(error, "Unable to load public bookmarks."));
  }

  return data ?? [];
}
