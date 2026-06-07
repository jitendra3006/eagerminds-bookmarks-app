"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireProfile } from "@/lib/auth";
import { getErrorMessage } from "@/lib/errors";
import { createClient } from "@/lib/supabase/server";
import { bookmarkSchema } from "@/lib/validation";
import type { ActionResult, BookmarkFormState } from "@/types/actions";
import type { Bookmark } from "@/types/database";

async function parseBookmarkForm(
  formData: FormData,
): Promise<
  | { success: true; data: { title: string; url: string; description: string | null; isPublic: boolean } }
  | { success: false; state: BookmarkFormState }
> {
  const parsed = bookmarkSchema.safeParse({
    title: formData.get("title"),
    url: formData.get("url"),
    description: formData.get("description"),
    isPublic: formData.get("isPublic"),
  });

  if (!parsed.success) {
    const fieldErrors: BookmarkFormState["fieldErrors"] = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (
        field === "title" ||
        field === "url" ||
        field === "description" ||
        field === "isPublic"
      ) {
        fieldErrors[field] = issue.message;
      }
    }

    return {
      success: false,
      state: {
        error: parsed.error.issues[0]?.message ?? "Invalid form data.",
        fieldErrors,
      },
    };
  }

  return { success: true, data: parsed.data };
}

export async function createBookmark(
  _prevState: BookmarkFormState,
  formData: FormData,
): Promise<BookmarkFormState> {
  const profile = await requireProfile();
  const parsed = await parseBookmarkForm(formData);

  if (!parsed.success) {
    return parsed.state;
  }

  const supabase = await createClient();
  const { error } = await supabase.from("bookmarks").insert({
    user_id: profile.id,
    title: parsed.data.title,
    url: parsed.data.url,
    description: parsed.data.description,
    is_public: parsed.data.isPublic,
  });

  if (error) {
    return {
      error: getErrorMessage(error, "Unable to create bookmark."),
    };
  }

  revalidatePath("/bookmarks");
  redirect("/bookmarks");
}

export async function updateBookmark(
  bookmarkId: string,
  _prevState: BookmarkFormState,
  formData: FormData,
): Promise<BookmarkFormState> {
  await requireProfile();
  const parsed = await parseBookmarkForm(formData);

  if (!parsed.success) {
    return parsed.state;
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("bookmarks")
    .update({
      title: parsed.data.title,
      url: parsed.data.url,
      description: parsed.data.description,
      is_public: parsed.data.isPublic,
    })
    .eq("id", bookmarkId);

  if (error) {
    return {
      error: getErrorMessage(error, "Unable to update bookmark."),
    };
  }

  revalidatePath("/bookmarks");
  revalidatePath(`/bookmarks/${bookmarkId}/edit`);

  const profile = await requireProfile();
  revalidatePath(`/${profile.handle}`);

  redirect("/bookmarks");
}

export async function deleteBookmark(
  bookmarkId: string,
): Promise<ActionResult> {
  await requireProfile();

  const supabase = await createClient();
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", bookmarkId);

  if (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Unable to delete bookmark."),
    };
  }

  revalidatePath("/bookmarks");

  const profile = await requireProfile();
  revalidatePath(`/${profile.handle}`);

  return { success: true, data: undefined };
}

export async function getUserBookmarks(): Promise<Bookmark[]> {
  const profile = await requireProfile();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(getErrorMessage(error, "Unable to load bookmarks."));
  }

  return data ?? [];
}

export async function getBookmarkById(
  bookmarkId: string,
): Promise<Bookmark | null> {
  const profile = await requireProfile();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("id", bookmarkId)
    .eq("user_id", profile.id)
    .maybeSingle();

  if (error) {
    throw new Error(getErrorMessage(error, "Unable to load bookmark."));
  }

  return data;
}
