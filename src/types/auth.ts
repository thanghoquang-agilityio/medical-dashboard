import { UserModel } from './user';

export interface SignInFormData {
  identifier: string;
  password: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export type AuthResponse = {
  jwt: string;
  user: UserModel | null;
  error: string;
};
