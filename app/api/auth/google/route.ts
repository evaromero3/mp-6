// app/api/auth/google/route.ts
import { NextResponse } from "next/server";

export function GET(request: Request) {
  const origin = new URL(request.url).origin;  
  const redirect_uri = `${origin}/api/auth/google/callback`;
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri,
    response_type: "code",
    scope: "openid email profile",
    prompt: "consent",
  });
  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}
