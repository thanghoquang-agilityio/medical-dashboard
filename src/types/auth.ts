import { UserModel } from './user';

export interface SignInForm {
  identifier: string;
  password: string;
}

export interface SignUpForm {
  username: string;
  email: string;
  password: string;
}

export type AuthResponse = {
  jwt: string;
  user: UserModel | null;
  error: string;
};
