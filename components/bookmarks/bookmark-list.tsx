import Link from "next/link";

import { BookmarkCard } from "@/components/bookmarks/bookmark-card";
import { EmptyState } from "@/components/states/empty-state";
import { Button } from "@/components/ui/button";
import type { Bookmark } from "@/types/database";

export function BookmarkList({ bookmarks }: { bookmarks: Bookmark[] }) {
  if (bookmarks.length === 0) {
    return (
      <EmptyState
        title="No bookmarks yet"
        description="Save your first link to build a personal library you can keep private or share publicly."
        action={
          <Link href="/bookmarks/new">
            <Button>Add bookmark</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} showActions />
      ))}
    </div>
  );
}
