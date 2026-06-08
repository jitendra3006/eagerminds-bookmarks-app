# EagerMinds Bookmarks App

A production-ready bookmarks application built with Next.js, TypeScript, Supabase, and Tailwind CSS.

## Live Demo

Production URL:

[https://eagerminds-bookmarks-app-five.vercel.app](https://eagerminds-bookmarks-app-five.vercel.app)

## GitHub Repository

[https://github.com/jitendra3006/eagerminds-bookmarks-app](https://github.com/jitendra3006/eagerminds-bookmarks-app)

---

## Features

### Authentication

- Email and password signup
- Secure login/logout
- Session persistence
- Protected routes

### Profile Management

- Unique public handles
- Public profile pages
- Profile update support
- Recovery flow for missing profiles

### Bookmark Management

- Create bookmarks
- Edit bookmarks
- Delete bookmarks
- Public/Private visibility control

### Public Profiles

- Public bookmark showcase
- Shareable profile URLs
- Handle-based routing

### Security

- Supabase Row Level Security (RLS)
- User-owned bookmark access control
- Protected dashboard routes
- Secure profile creation trigger

---

## Tech Stack

### Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Backend

- Supabase
- PostgreSQL
- Server Actions

### Deployment

- Vercel

---

## Project Architecture

User  
↓  
Next.js Application  
↓  
Supabase API  
↓  
PostgreSQL Database

Tables:

profiles

- id
- email
- handle
- full_name
- created_at

bookmarks

- id
- user_id
- title
- url
- description
- is_public
- created_at

---

## Environment Variables

Create a `.env.local` file:

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_APP_URL=

RESEND_API_KEY= (optional)

RESEND_FROM_EMAIL= (optional)

---

## Installation

Clone the repository:

git clone [https://github.com/jitendra3006/eagerminds-bookmarks-app.git](https://github.com/jitendra3006/eagerminds-bookmarks-app.git)

Install dependencies:

npm install

Run development server:

npm run dev

Open:

[http://localhost:3000](http://localhost:3000)

---

## Database Setup

Run the following migrations in Supabase SQL Editor:

1. 001_additive_rls_and_indexes.sql
2. 002_profile_trigger.sql

These migrations:

- Configure RLS policies
- Add required indexes
- Automatically create profile records on signup

---

## Available Routes


| Route                | Description      |
| -------------------- | ---------------- |
| /                    | Landing Page     |
| /login               | Login            |
| /signup              | Signup           |
| /bookmarks           | User Bookmarks   |
| /bookmarks/new       | Create Bookmark  |
| /bookmarks/[id]/edit | Edit Bookmark    |
| /settings            | Profile Settings |
| /complete-profile    | Profile Recovery |
| /[handle]            | Public Profile   |


---

## Testing Completed

- Signup
- Login
- Logout
- Create Bookmark
- Edit Bookmark
- Delete Bookmark
- Public Bookmark Visibility
- Private Bookmark Visibility
- Public Profiles
- Route Protection
- Production Deployment

All functionality verified in production.

---



## AI Agent Mistake and Fix

During development, the AI agent initially handled profile creation only through the application signup flow. This led to a situation where an authentication user could be created successfully, but the corresponding profile record was not always created. As a result, bookmark creation failed due to a foreign key constraint because bookmarks reference profile records.

I investigated the issue by tracing the signup and bookmark creation flow, identifying that profile creation was not guaranteed. To fix this, I implemented a Supabase database trigger that automatically creates a profile whenever a new authentication user is created. I also added a recovery flow for users who might be missing a profile record. After these changes, signup, profile creation, and bookmark CRUD operations worked reliably in both local and production environments.

## What I Would Improve With More Time

With more time, I would enhance the application by adding bookmark tags, search and filtering capabilities, bookmark categories, and a richer public profile experience. I would also complete full email onboarding with Resend, add automated testing, improve UI polish, and introduce analytics to better understand user activity and engagement.

## Author

Jitendra Singh

Java | Spring Boot | React | Next.js | PostgreSQL | Supabase