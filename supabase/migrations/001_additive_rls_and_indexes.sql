-- Additive migration for existing profiles and bookmarks tables.
-- Safe to run multiple times; does not create tables.

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS profiles_handle_idx ON public.profiles (handle);

CREATE INDEX IF NOT EXISTS bookmarks_user_id_idx ON public.bookmarks (user_id);

CREATE INDEX IF NOT EXISTS bookmarks_user_id_created_at_idx
  ON public.bookmarks (user_id, created_at DESC);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Profiles: public read
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND policyname = 'profiles_select_public'
  ) THEN
    CREATE POLICY profiles_select_public
      ON public.profiles
      FOR SELECT
      USING (true);
  END IF;
END $$;

-- Profiles: users insert own row (signup)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND policyname = 'profiles_insert_own'
  ) THEN
    CREATE POLICY profiles_insert_own
      ON public.profiles
      FOR INSERT
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Profiles: users update own row
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND policyname = 'profiles_update_own'
  ) THEN
    CREATE POLICY profiles_update_own
      ON public.profiles
      FOR UPDATE
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Bookmarks: read public or own
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'bookmarks'
      AND policyname = 'bookmarks_select_public_or_own'
  ) THEN
    CREATE POLICY bookmarks_select_public_or_own
      ON public.bookmarks
      FOR SELECT
      USING (is_public = true OR auth.uid() = user_id);
  END IF;
END $$;

-- Bookmarks: insert own
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'bookmarks'
      AND policyname = 'bookmarks_insert_own'
  ) THEN
    CREATE POLICY bookmarks_insert_own
      ON public.bookmarks
      FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Bookmarks: update own
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'bookmarks'
      AND policyname = 'bookmarks_update_own'
  ) THEN
    CREATE POLICY bookmarks_update_own
      ON public.bookmarks
      FOR UPDATE
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Bookmarks: delete own
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'bookmarks'
      AND policyname = 'bookmarks_delete_own'
  ) THEN
    CREATE POLICY bookmarks_delete_own
      ON public.bookmarks
      FOR DELETE
      USING (auth.uid() = user_id);
  END IF;
END $$;
