import { UserModel } from './user';

export interface LoginFormData {
  identifier: string;
  password: string;
  remember: boolean;
}

export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassWord: string;
}

export type AuthResponse = {
  jwt: string;
  user: UserModel | null;
  error: string | null;
};
