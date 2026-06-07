import { Resend } from "resend";

import { getSiteUrl } from "@/lib/utils";

type WelcomeEmailInput = {
  to: string;
  fullName: string;
  handle: string;
};

export async function sendWelcomeEmail({
  to,
  fullName,
  handle,
}: WelcomeEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn("Resend is not configured; skipping welcome email.");
    return;
  }

  const resend = new Resend(apiKey);
  const profileUrl = `${getSiteUrl()}/${handle}`;

  const { error } = await resend.emails.send({
    from,
    to,
    subject: "Welcome to EagerMinds Bookmarks",
    html: `
      <h1>Welcome, ${fullName}!</h1>
      <p>Your bookmarks account is ready.</p>
      <p>Your public profile: <a href="${profileUrl}">${profileUrl}</a></p>
      <p>Start saving links from your dashboard.</p>
    `,
  });

  if (error) {
    console.error("Failed to send welcome email:", error.message);
  }
}
