"use client";

import { useFormStatus } from "react-dom";

export function useFormStatusState() {
  const { pending } = useFormStatus();
  return { isPending: pending };
}
