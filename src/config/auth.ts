// Libs
import NextAuth from 'next-auth';
import { cookies } from 'next/headers';

// "Credentials" next-provider: User login by "email" & "password"
import Credentials from 'next-auth/providers/credentials';

// Configs
import { authConfig } from './auth.config';
import { REMEMBER_ME_COOKIES_KEY } from '@/constants';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(_, req) {
        const user = await req.json();

        cookies().set({
          name: REMEMBER_ME_COOKIES_KEY,
          value: user.remember,
          httpOnly: true,
          path: '/',
        });

        if (user) return user;

        return null;
      },
    }),
  ],
});
