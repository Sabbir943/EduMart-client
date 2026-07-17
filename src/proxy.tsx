import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { auth } from './lib/auth'; // আপনার সঠিক পাথ চেক করে নিন

// 🌟 ফাংশনের নাম অবশ্যই 'proxy' হতে হবে (Next.js 16+ স্ট্যান্ডার্ড অনুযায়ী)
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/courses/:id', 
    '/dashboard/mentor/:path*', 
    '/dashboard/student/:path*'
  ]
};