import { NextRequest, NextResponse } from 'next/server';
import { scalekit } from '@/lib/scalekit';

export async function GET(request: NextRequest) {
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
  const url = scalekit.getAuthorizationUrl(redirectUri);

  return NextResponse.redirect(url);
}