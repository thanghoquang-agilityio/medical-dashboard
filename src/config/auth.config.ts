// Libs
import { NextAuthConfig } from 'next-auth';

// Constants
import { PRIVATE_ROUTES, AUTH_ROUTES } from '@/constants';

const maxAge = 24 * 60 * 60;

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: AUTH_ROUTES.LOGIN,
  },
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = !Object.values(AUTH_ROUTES).includes(
        nextUrl.pathname,
      );

      if (isLoggedIn) {
        // Move to Homepage if logged in
        if (nextUrl.pathname === '/' || !isOnDashboard) {
          return Response.redirect(new URL(PRIVATE_ROUTES.DASHBOARD, nextUrl));
        }

        return true;
      } else {
        if (!isOnDashboard) {
          return true;
        }
        // Move to Sign in page if not logged in and try to access the dashboard
        return Response.redirect(new URL(AUTH_ROUTES.LOGIN, nextUrl));
      }
    },
  },
  providers: [],
  session: { maxAge },
};
