import type { Metadata } from "next";

import { SignupForm } from "@/components/auth/signup-form";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an account to save and share bookmarks.",
};

export default function SignupPage() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Create your account
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Pick a handle and start collecting bookmarks.
        </p>
      </div>
      <Card>
        <SignupForm />
      </Card>
    </div>
  );
}
