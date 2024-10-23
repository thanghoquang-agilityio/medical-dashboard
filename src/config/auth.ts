// Libs
import NextAuth from 'next-auth';

// "Credentials" next-provider: User login by "email" & "password"
import Credentials from 'next-auth/providers/credentials';

// Configs
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
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

        if (!user) throw new Error('User not found.');

        const formatUser = {
          ...user,
          avatarUrl: user.avatarUrl === 'null' ? null : user.avatarUrl,
        };

        return formatUser;
      },
    }),
  ],
});
