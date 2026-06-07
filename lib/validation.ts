import { z } from "zod";

import { isReservedHandle } from "@/lib/reserved-handles";

const handleSchema = z
  .string()
  .trim()
  .min(3, "Handle must be at least 3 characters.")
  .max(30, "Handle must be at most 30 characters.")
  .regex(
    /^[a-z0-9_]+$/,
    "Handle may only contain lowercase letters, numbers, and underscores.",
  )
  .refine((value) => !isReservedHandle(value), "This handle is reserved.");

export const signUpSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password must be at most 72 characters."),
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required.")
    .max(120, "Full name is too long."),
  handle: handleSchema,
});

export const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export const bookmarkSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(200, "Title is too long."),
  url: z.string().trim().url("Enter a valid URL."),
  description: z
    .string()
    .trim()
    .max(1000, "Description is too long.")
    .optional()
    .transform((value) => value || null),
  isPublic: z
    .union([z.literal("on"), z.literal("true"), z.literal("false"), z.null()])
    .optional()
    .transform((value) => value === "on" || value === "true"),
});

export const profileSchema = z.object({
  handle: handleSchema,
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required.")
    .max(120, "Full name is too long."),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type BookmarkInput = z.infer<typeof bookmarkSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
