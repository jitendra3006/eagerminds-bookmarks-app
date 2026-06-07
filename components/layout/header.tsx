import Link from "next/link";

import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { getCurrentProfile, getSessionUser } from "@/lib/auth";

export async function Header() {
  const user = await getSessionUser();
  const profile = user ? await getCurrentProfile() : null;

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            EagerMinds
          </Link>
          {user ? (
            <nav className="hidden items-center gap-4 text-sm sm:flex">
              <Link
                href="/bookmarks"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Bookmarks
              </Link>
              <Link
                href="/settings"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Settings
              </Link>
              {profile ? (
                <Link
                  href={`/${profile.handle}`}
                  className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  Public profile
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-zinc-600 dark:text-zinc-400 sm:inline">
                {profile?.full_name ?? user.email}
              </span>
              <form action={signOut}>
                <Button type="submit" variant="secondary">
                  Log out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
