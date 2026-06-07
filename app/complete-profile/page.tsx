import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { CompleteProfileForm } from "@/components/profile/complete-profile-form";
import { Card } from "@/components/ui/card";
import { getCurrentProfile, requireUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Complete profile",
  description: "Finish setting up your profile.",
};

export default async function CompleteProfilePage() {
  const user = await requireUser();
  const profile = await getCurrentProfile();

  if (profile) {
    redirect("/bookmarks");
  }

  const metadata = user.user_metadata as {
    handle?: string;
    full_name?: string;
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-10 sm:px-6">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Complete your profile
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            One more step before you can use bookmarks.
          </p>
        </div>
        <Card>
          <CompleteProfileForm
            email={user.email ?? ""}
            defaultHandle={metadata.handle ?? ""}
            defaultFullName={metadata.full_name ?? ""}
          />
        </Card>
      </div>
    </div>
  );
}
