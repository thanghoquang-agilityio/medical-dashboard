import { Option, UserModel } from '@/types';

export const transformUsers = (users: UserModel[]): Option[] =>
  users.map(({ email }) => ({
    key: email,
    label: email,
  }));
