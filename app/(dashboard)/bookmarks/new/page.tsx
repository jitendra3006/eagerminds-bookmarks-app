import type { Metadata } from "next";

import { createBookmark } from "@/actions/bookmarks";
import { BookmarkForm } from "@/components/bookmarks/bookmark-form";
import { Card } from "@/components/ui/card";
import { requireProfile } from "@/lib/auth";

export const metadata: Metadata = {
  title: "New bookmark",
  description: "Create a new bookmark.",
};

export default async function NewBookmarkPage() {
  await requireProfile();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Add bookmark
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Save a link with an optional description and visibility setting.
        </p>
      </div>
      <Card>
        <BookmarkForm action={createBookmark} submitLabel="Create bookmark" />
      </Card>
    </div>
  );
}
