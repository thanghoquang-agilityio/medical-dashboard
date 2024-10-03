'use server';

import {
  getUsers as getUsersService,
  getUserRoles as getUserRolesService,
} from '@/services';

export const getUsers = async () => {
  const users = await getUsersService();
  return users;
};

export const getUserRoles = async () => {
  const roles = await getUserRolesService();
  return roles;
};
