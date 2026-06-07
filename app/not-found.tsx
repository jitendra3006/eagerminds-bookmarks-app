import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Page not found
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        The page you are looking for does not exist.
      </p>
      <Link href="/">
        <Button>Back home</Button>
      </Link>
    </div>
  );
}
