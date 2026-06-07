-- Additive migration: auto-create public.profiles when auth.users row is inserted.
-- Safe to run multiple times.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  profile_handle text;
  profile_full_name text;
BEGIN
  profile_handle := nullif(trim(NEW.raw_user_meta_data->>'handle'), '');
  profile_full_name := nullif(trim(NEW.raw_user_meta_data->>'full_name'), '');

  IF profile_handle IS NULL THEN
    profile_handle :=
      lower(regexp_replace(split_part(NEW.email, '@', 1), '[^a-z0-9_]', '_', 'g'))
      || '_'
      || substr(replace(NEW.id::text, '-', ''), 1, 8);
  END IF;

  INSERT INTO public.profiles (id, email, handle, full_name)
  VALUES (NEW.id, NEW.email, profile_handle, profile_full_name)
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
