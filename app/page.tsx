import type { Metadata } from "next";
import Link from "next/link";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "EagerMinds Bookmarks",
  description: "Save, organize, and share your favorite links.",
};

export default async function HomePage() {
  const user = await getSessionUser();

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-16 sm:px-6">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Bookmarks for builders
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Save links privately. Share the best ones publicly.
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Create a personal bookmark library, control visibility per link, and
            publish a clean public profile at your own handle.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {user ? (
              <Link href="/bookmarks">
                <Button className="w-full sm:w-auto">Go to bookmarks</Button>
              </Link>
            ) : (
              <>
                <Link href="/signup">
                  <Button className="w-full sm:w-auto">Get started</Button>
                </Link>
                <Link href="/login">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Log in
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
