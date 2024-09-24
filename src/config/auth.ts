// Libs
import NextAuth from 'next-auth';
import { cookies } from 'next/headers';

// "Credentials" next-provider: User login by "email" & "password"
import Credentials from 'next-auth/providers/credentials';

// Configs
import { authConfig } from './auth.config';

import { TOKEN, UID_KEY } from '@/constants';

const setCookie = (
  name: string,
  value: string,
  httpOnly: boolean,
  path: string,
) => {
  cookies().set({
    name,
    value,
    httpOnly,
    path,
  });
};

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
          name: 'remember-me',
          value: user.remember,
          httpOnly: true,
          path: '/',
        });

        if (user) {
          const { id, token } = user;

          setCookie(UID_KEY, id.toString(), true, '/');
          setCookie(TOKEN, token, true, '/');

          return user;
        }

        return null;
      },
    }),
  ],
});
