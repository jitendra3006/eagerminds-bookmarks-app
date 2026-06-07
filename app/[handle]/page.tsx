import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getProfileByHandle,
  getPublicBookmarksByUserId,
} from "@/actions/profile";
import { BookmarkCard } from "@/components/bookmarks/bookmark-card";
import { ProfileHeader } from "@/components/profile/profile-header";
import { EmptyState } from "@/components/states/empty-state";
import { isReservedHandle } from "@/lib/reserved-handles";
import { getSiteUrl } from "@/lib/utils";

type PublicProfilePageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({
  params,
}: PublicProfilePageProps): Promise<Metadata> {
  const { handle } = await params;

  if (isReservedHandle(handle)) {
    return {
      title: "Profile not found",
    };
  }

  const profile = await getProfileByHandle(handle);

  if (!profile) {
    return {
      title: "Profile not found",
    };
  }

  const displayName = profile.full_name ?? profile.handle;
  const profileUrl = `${getSiteUrl()}/${profile.handle}`;

  return {
    title: `${displayName} (@${profile.handle})`,
    description: `Public bookmarks shared by ${displayName}.`,
    openGraph: {
      title: `${displayName} (@${profile.handle})`,
      description: `Public bookmarks shared by ${displayName}.`,
      url: profileUrl,
      type: "profile",
    },
    twitter: {
      card: "summary",
      title: `${displayName} (@${profile.handle})`,
      description: `Public bookmarks shared by ${displayName}.`,
    },
  };
}

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { handle } = await params;

  if (isReservedHandle(handle)) {
    notFound();
  }

  const profile = await getProfileByHandle(handle);

  if (!profile) {
    notFound();
  }

  const bookmarks = await getPublicBookmarksByUserId(profile.id);

  return (
    <div className="space-y-8">
      <ProfileHeader profile={profile} />
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Public bookmarks
        </h2>
        {bookmarks.length === 0 ? (
          <EmptyState
            title="No public bookmarks"
            description="This profile has not shared any bookmarks publicly yet."
          />
        ) : (
          <div className="grid gap-4">
            {bookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
