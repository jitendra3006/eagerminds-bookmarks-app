"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { deleteBookmark } from "@/actions/bookmarks";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function DeleteBookmarkButton({ bookmarkId }: { bookmarkId: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(
      "Delete this bookmark? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      setError(null);
      const result = await deleteBookmark(bookmarkId);

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.push("/bookmarks");
      router.refresh();
    });
  }

  return (
    <div className="space-y-3">
      {error ? <Alert variant="error">{error}</Alert> : null}
      <Button
        type="button"
        variant="danger"
        onClick={handleDelete}
        isLoading={isPending}
      >
        Delete bookmark
      </Button>
    </div>
  );
}
