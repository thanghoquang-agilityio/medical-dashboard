'use server';

import {
  getUsers as getUsersService,
  getUserRoles as getUserRolesService,
  addUser as addUserService,
} from '@/services';
import { UserPayload } from '@/types';

export const getUsers = async () => {
  const users = await getUsersService();
  return users;
};

export const getUserRoles = async () => {
  const roles = await getUserRolesService();
  return roles;
};

export const addUser = async (data: UserPayload) => {
  const user = await addUserService(data);
  return user;
};
