const RESERVED_HANDLES = new Set([
  "login",
  "signup",
  "bookmarks",
  "settings",
  "api",
  "admin",
  "auth",
  "new",
  "edit",
  "profile",
  "profiles",
  "bookmark",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
]);

export function isReservedHandle(handle: string): boolean {
  return RESERVED_HANDLES.has(handle.toLowerCase());
}
