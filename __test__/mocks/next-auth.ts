export class AuthError extends Error {
  type: string;
  constructor(type: string) {
    super(type);
    this.type = type;
  }
}

const NextAuth = () => ({
  auth: {
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.AUTH_SECRET,
    },
  },
  signIn: jest.fn(),
  signOut: jest.fn(),
  handlers: {
    GET: jest.fn(),
    POST: jest.fn(),
  },
  AuthError: AuthError,
});

export default NextAuth;
