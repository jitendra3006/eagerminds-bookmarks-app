# EagerMinds Bookmarks

A production-ready bookmarks app built with Next.js App Router, TypeScript, Tailwind CSS, Supabase, and Resend.

## Features

- Email/password authentication with session persistence
- Middleware-protected dashboard routes
- User profiles with unique handles
- Bookmark CRUD with public/private visibility
- Public profile pages at `/{handle}`
- Welcome email on signup (Resend)

## Existing Supabase schema

The remote project already includes these tables:

### `profiles`
- `id`, `email`, `handle`, `full_name`, `created_at`

### `bookmarks`
- `id`, `user_id`, `title`, `url`, `description`, `is_public`, `created_at`

No duplicate tables are created by this app. Apply these additive migrations in order:

1. `supabase/migrations/001_additive_rls_and_indexes.sql` — indexes and RLS policies
2. `supabase/migrations/002_profile_trigger.sql` — `SECURITY DEFINER` trigger to auto-create profiles on signup

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@yourdomain.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the additive migration in the Supabase SQL editor:

```sql
-- paste contents of supabase/migrations/001_additive_rls_and_indexes.sql
```

5. In Supabase Auth settings, disable email confirmation if you want immediate access after signup.

6. Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Project structure

```text
app/           Route handlers and pages
actions/       Server Actions
components/    Reusable UI and feature components
hooks/         Client hooks
lib/           Supabase clients, validation, email, utilities
types/         Shared TypeScript types
supabase/      Additive SQL migrations
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/login` | Sign in |
| `/signup` | Create account |
| `/bookmarks` | Private bookmark list |
| `/bookmarks/new` | Create bookmark |
| `/bookmarks/[id]/edit` | Edit/delete bookmark |
| `/settings` | Profile settings |
| `/complete-profile` | One-time recovery for auth users missing a profile row |
| `/[handle]` | Public profile |
