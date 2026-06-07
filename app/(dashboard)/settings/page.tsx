import type { Metadata } from "next";

import { ProfileSettingsForm } from "@/components/profile/profile-settings-form";
import { Card } from "@/components/ui/card";
import { requireProfile } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Settings",
  description: "Update your profile settings.",
};

export default async function SettingsPage() {
  const profile = await requireProfile();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Profile settings
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Update your public profile details.
        </p>
      </div>
      <Card>
        <ProfileSettingsForm profile={profile} />
      </Card>
    </div>
  );
}
