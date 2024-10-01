'use server';

import { getUsers as getUsersService } from '@/services';

export const getUsers = async () => {
  const users = await getUsersService();
  return users;
};
