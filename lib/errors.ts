export function isDuplicateKeyError(error: unknown): boolean {
  const message = getRawErrorMessage(error).toLowerCase();

  return (
    message.includes("duplicate key") ||
    message.includes("unique constraint") ||
    message.includes("profiles_pkey") ||
    message.includes("profiles_handle_key")
  );
}

function getRawErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message: unknown }).message);
  }

  return "";
}

export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return mapDatabaseError(error.message);
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    const message = String((error as { message: unknown }).message);
    return mapDatabaseError(message);
  }

  return fallback;
}

function mapDatabaseError(message: string): string {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("duplicate key") ||
    normalized.includes("profiles_handle_key") ||
    normalized.includes("unique constraint")
  ) {
    return "That handle is already taken. Please choose another.";
  }

  if (normalized.includes("invalid login credentials")) {
    return "Invalid email or password.";
  }

  if (normalized.includes("user already registered")) {
    return "An account with this email already exists.";
  }

  if (normalized.includes("row-level security")) {
    return "You do not have permission to perform this action.";
  }

  return message;
}
