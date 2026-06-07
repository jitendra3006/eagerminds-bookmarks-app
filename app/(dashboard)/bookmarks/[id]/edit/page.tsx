import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getBookmarkById, updateBookmark } from "@/actions/bookmarks";
import { BookmarkForm } from "@/components/bookmarks/bookmark-form";
import { DeleteBookmarkButton } from "@/components/bookmarks/delete-bookmark-button";
import { Card } from "@/components/ui/card";

type EditBookmarkPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: EditBookmarkPageProps): Promise<Metadata> {
  const { id } = await params;
  const bookmark = await getBookmarkById(id);

  return {
    title: bookmark ? `Edit ${bookmark.title}` : "Edit bookmark",
  };
}

export default async function EditBookmarkPage({ params }: EditBookmarkPageProps) {
  const { id } = await params;
  const bookmark = await getBookmarkById(id);

  if (!bookmark) {
    notFound();
  }

  const boundUpdateBookmark = updateBookmark.bind(null, id);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Edit bookmark
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Update the details or delete this bookmark.
        </p>
      </div>
      <Card>
        <BookmarkForm
          action={boundUpdateBookmark}
          bookmark={bookmark}
          submitLabel="Save changes"
        />
      </Card>
      <DeleteBookmarkButton bookmarkId={bookmark.id} />
    </div>
  );
}
