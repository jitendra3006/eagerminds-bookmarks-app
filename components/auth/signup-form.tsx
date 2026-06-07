"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signUp } from "@/actions/auth";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AuthFormState } from "@/types/actions";

const initialState: AuthFormState = {};

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      <Input
        label="Full name"
        name="fullName"
        autoComplete="name"
        required
      />
      <Input
        label="Handle"
        name="handle"
        autoComplete="username"
        placeholder="jane_doe"
        required
      />
      <p className="-mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        Lowercase letters, numbers, and underscores only. This becomes your public
        profile URL.
      </p>
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
      />
      <Button type="submit" className="w-full" isLoading={isPending}>
        Create account
      </Button>
      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-zinc-900 dark:text-zinc-100">
          Log in
        </Link>
      </p>
    </form>
  );
}
