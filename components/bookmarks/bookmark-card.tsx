import Link from "next/link";

import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Bookmark } from "@/types/database";

export function BookmarkCard({
  bookmark,
  showActions = false,
}: {
  bookmark: Bookmark;
  showActions?: boolean;
}) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {bookmark.title}
          </h3>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block truncate text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            {bookmark.url}
          </a>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            bookmark.is_public
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
              : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          {bookmark.is_public ? "Public" : "Private"}
        </span>
      </div>
      {bookmark.description ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {bookmark.description}
        </p>
      ) : null}
      <div className="flex items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <span>Saved {formatDate(bookmark.created_at)}</span>
        {showActions ? (
          <Link
            href={`/bookmarks/${bookmark.id}/edit`}
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
          >
            Edit
          </Link>
        ) : null}
      </div>
    </Card>
  );
}
