"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { sendWelcomeEmail } from "@/lib/email";
import { getErrorMessage } from "@/lib/errors";
import { ensureProfileExists } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { signInSchema, signUpSchema } from "@/lib/validation";
import type { AuthFormState } from "@/types/actions";

export async function signUp(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
    handle: formData.get("handle"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data." };
  }

  const supabase = await createClient();
  const { email, password, fullName, handle } = parsed.data;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        handle,
      },
    },
  });

  if (authError) {
    return { error: getErrorMessage(authError, "Unable to create account.") };
  }

  const user = authData.user;

  if (!user) {
    return { error: "Unable to create account." };
  }

  if (!authData.session) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return {
        error: getErrorMessage(signInError, "Account created but sign-in failed."),
      };
    }
  }

  const profileResult = await ensureProfileExists(supabase, {
    userId: user.id,
    email,
    handle,
    fullName,
  });

  if (profileResult.error) {
    return { error: profileResult.error };
  }

  await sendWelcomeEmail({
    to: email,
    fullName,
    handle,
  });

  revalidatePath("/", "layout");
  redirect("/bookmarks");
}

export async function signIn(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: getErrorMessage(error, "Unable to sign in.") };
  }

  const redirectTo = formData.get("redirectTo");
  const destination =
    typeof redirectTo === "string" && redirectTo.startsWith("/")
      ? redirectTo
      : "/bookmarks";

  revalidatePath("/", "layout");
  redirect(destination);
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
