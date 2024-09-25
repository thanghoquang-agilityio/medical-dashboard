// Libs
import NextAuth from 'next-auth';

// "Credentials" next-provider: User login by "email" & "password"
import Credentials from 'next-auth/providers/credentials';

// Configs
import { authConfig } from './auth.config';

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
        if (user) return user;

        return null;
      },
    }),
  ],
});
