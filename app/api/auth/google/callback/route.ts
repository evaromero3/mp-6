// app/api/auth/google/callback/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const origin = url.origin;

  if (!code) {
    // No code => just bounce home
    return NextResponse.redirect(origin);
  }

  // 1) Exchange code for tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${origin}/api/auth/google/callback`,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenRes.ok) {
    console.error("Token exchange failed:", await tokenRes.text());
    return NextResponse.redirect(origin);
  }
  const { access_token } = await tokenRes.json();

  // 2) Fetch the user’s profile
  const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!profileRes.ok) {
    console.error("Profile fetch failed:", await profileRes.text());
    return NextResponse.redirect(origin);
  }
  const profile = await profileRes.json();

  // 3) Redirect back to your app, tucking the profile into the URL
  //    (encodeURIComponent so it survives as a search param)
  const dest = new URL(origin);
  dest.searchParams.set("user", encodeURIComponent(JSON.stringify(profile)));
  return NextResponse.redirect(dest);
}
