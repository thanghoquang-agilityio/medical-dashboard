import NextAuth from 'next-auth';
import { authConfig } from '@/config/auth.config';
import { auth as authSession } from '@/config/auth';

// Types
import type { GetServerSidePropsContext } from 'next';

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    '/((?!api|favicon.ico|sitemap.xml|robots.txt|_next/static|_next/image|.*\\.png$|.*\\.webp$).*)',
  ],
};

export default async function auth(params: GetServerSidePropsContext) {
  if (authConfig.session) {
    const session = await authSession();
    const remember = String(session?.user?.remember || false);

    authConfig.session.maxAge =
      remember === 'true'
        ? parseInt(process.env.NEXT_PUBLIC_EXPIRED_TIME_REMEMBER || '604800') // 7 days
        : parseInt(process.env.NEXT_PUBLIC_EXPIRED_TIME_NO_REMEMBER || '86400'); // 1 day
  }

  return NextAuth(authConfig).auth(params);
}
