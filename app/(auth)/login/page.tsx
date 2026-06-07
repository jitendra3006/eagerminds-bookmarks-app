import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to manage your bookmarks.",
};

type LoginPageProps = {
  searchParams: Promise<{ redirectTo?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Welcome back
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Log in to access your bookmarks.
        </p>
      </div>
      <Card>
        <LoginForm redirectTo={params.redirectTo} />
      </Card>
    </div>
  );
}
