"use client";

import { useActionState } from "react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BookmarkFormState } from "@/types/actions";
import type { Bookmark } from "@/types/database";

type BookmarkFormProps = {
  action: (
    prevState: BookmarkFormState,
    formData: FormData,
  ) => Promise<BookmarkFormState>;
  bookmark?: Bookmark;
  submitLabel: string;
};

const initialState: BookmarkFormState = {};

export function BookmarkForm({
  action,
  bookmark,
  submitLabel,
}: BookmarkFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? <Alert variant="error">{state.error}</Alert> : null}
      <Input
        label="Title"
        name="title"
        defaultValue={bookmark?.title}
        error={state.fieldErrors?.title}
        required
      />
      <Input
        label="URL"
        name="url"
        type="url"
        defaultValue={bookmark?.url}
        error={state.fieldErrors?.url}
        required
      />
      <Textarea
        label="Description"
        name="description"
        defaultValue={bookmark?.description ?? ""}
        error={state.fieldErrors?.description}
      />
      <Checkbox
        label="Make this bookmark public"
        description="Public bookmarks appear on your profile page."
        name="isPublic"
        defaultChecked={bookmark?.is_public ?? false}
      />
      <Button type="submit" isLoading={isPending}>
        {submitLabel}
      </Button>
    </form>
  );
}
