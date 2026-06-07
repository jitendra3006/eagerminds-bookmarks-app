import type { Metadata } from "next";
import Link from "next/link";

import { getUserBookmarks } from "@/actions/bookmarks";
import { BookmarkList } from "@/components/bookmarks/bookmark-list";
import { Button } from "@/components/ui/button";
import { requireProfile } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Bookmarks",
  description: "Manage your saved bookmarks.",
};

export default async function BookmarksPage() {
  await requireProfile();
  const bookmarks = await getUserBookmarks();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Your bookmarks
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Save links privately or share them on your public profile.
          </p>
        </div>
        <Link href="/bookmarks/new">
          <Button>Add bookmark</Button>
        </Link>
      </div>
      <BookmarkList bookmarks={bookmarks} />
    </div>
  );
}
