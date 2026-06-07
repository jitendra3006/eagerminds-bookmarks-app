export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

export type AuthFormState = {
  error?: string;
};

export type BookmarkFormState = {
  error?: string;
  fieldErrors?: Partial<
    Record<"title" | "url" | "description" | "isPublic", string>
  >;
};

export type ProfileFormState = {
  error?: string;
  fieldErrors?: Partial<Record<"handle" | "full_name", string>>;
};
