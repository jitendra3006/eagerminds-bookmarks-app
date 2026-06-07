import type { SupabaseClient } from "@supabase/supabase-js";

import { getErrorMessage, isDuplicateKeyError } from "@/lib/errors";
import type { Database } from "@/types/database";

type EnsureProfileInput = {
  userId: string;
  email: string;
  handle: string;
  fullName: string;
};

export async function ensureProfileExists(
  supabase: SupabaseClient<Database>,
  input: EnsureProfileInput,
): Promise<{ error?: string }> {
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", input.userId)
    .maybeSingle();

  if (existing) {
    return {};
  }

  const { error } = await supabase.from("profiles").insert({
    id: input.userId,
    email: input.email,
    handle: input.handle,
    full_name: input.fullName,
  });

  if (error && !isDuplicateKeyError(error)) {
    return {
      error: getErrorMessage(error, "Unable to create profile."),
    };
  }

  return {};
}
