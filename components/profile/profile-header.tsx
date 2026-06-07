import type { Profile } from "@/types/database";

export function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Public profile
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {profile.full_name ?? profile.handle}
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">@{profile.handle}</p>
    </div>
  );
}
