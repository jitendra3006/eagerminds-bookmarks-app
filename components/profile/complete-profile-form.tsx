"use client";

import { useActionState } from "react";

import { recoverMissingProfile } from "@/actions/profile";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProfileFormState } from "@/types/actions";

const initialState: ProfileFormState = {};

type CompleteProfileFormProps = {
  email: string;
  defaultHandle?: string;
  defaultFullName?: string;
};

export function CompleteProfileForm({
  email,
  defaultHandle = "",
  defaultFullName = "",
}: CompleteProfileFormProps) {
  const [state, formAction, isPending] = useActionState(
    recoverMissingProfile,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Your account exists but your profile was not created. Complete your
        profile to start saving bookmarks.
      </p>
      <Input
        label="Full name"
        name="fullName"
        defaultValue={defaultFullName}
        error={state.fieldErrors?.full_name}
        required
      />
      <Input
        label="Handle"
        name="handle"
        defaultValue={defaultHandle}
        error={state.fieldErrors?.handle}
        placeholder="jane_doe"
        required
      />
      <Input label="Email" name="email" value={email} disabled />
      <Button type="submit" className="w-full" isLoading={isPending}>
        Complete profile
      </Button>
    </form>
  );
}
