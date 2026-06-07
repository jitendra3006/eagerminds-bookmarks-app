"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { updateProfile } from "@/actions/profile";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ProfileFormState } from "@/types/actions";
import type { Profile } from "@/types/database";

const initialState: ProfileFormState = {};

export function ProfileSettingsForm({ profile }: { profile: Profile }) {
  const [state, formAction, isPending] = useActionState(
    updateProfile,
    initialState,
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !isPending && !state.error && !state.fieldErrors) {
      setShowSuccess(true);
    }

    wasPending.current = isPending;
  }, [isPending, state.error, state.fieldErrors]);

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      {showSuccess && !state.error ? (
        <Alert variant="success">Profile updated successfully.</Alert>
      ) : null}
      <Input
        label="Full name"
        name="fullName"
        defaultValue={profile.full_name ?? ""}
        error={state.fieldErrors?.full_name}
        required
      />
      <Input
        label="Handle"
        name="handle"
        defaultValue={profile.handle}
        error={state.fieldErrors?.handle}
        required
      />
      <Input label="Email" name="email" defaultValue={profile.email} disabled />
      <Button type="submit" isLoading={isPending}>
        Save changes
      </Button>
    </form>
  );
}
