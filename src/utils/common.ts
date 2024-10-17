import { STATUS } from '@/components/ui';
import {
  APIRelatedResponse,
  APIResponse,
  Option,
  RolePermission,
  SpecialtyResponse,
  UserLogged,
  UserModel,
} from '@/types';

export const getObjectValue = <T, Key extends keyof T>(obj: T, key: string) => {
  return obj[key as Key] as string;
};

export const getDescriptionNotification = ({
  userId,
  senderId,
  content,
  time,
}: {
  userId: string;
  senderId: APIRelatedResponse<APIResponse<UserModel>>;
  content: string;
  time: string;
}) => {
  const { id = '', attributes } = senderId.data || {};
  const { username = '' } = attributes || {};

  const name = userId == id ? 'You' : username;
  return `${name} ${content} at ${time}`;
};

export const getGreeting = (): string => {
  const now = new Date();
  const currentHour = now.getHours();

  switch (true) {
    case currentHour < 12:
      return 'Good Morning';
    case currentHour < 18:
      return 'Good Afternoon';
    default:
      return 'Good Evening';
  }
};

export const getStatusKey = (value: string) => {
  const entry = Object.entries(STATUS).find(([_, val]) => val === value);
  return entry ? parseInt(entry[0]) : undefined;
};

export const transformUsers = (users: UserLogged[]): Option[] =>
  users.map(({ id, email }) => ({
    key: id,
    label: email,
  }));

export const transformSpecialties = (
  specialties: SpecialtyResponse[],
): Option[] => [
  { key: 'all', label: 'All' },
  ...specialties.map((specialty) => ({
    key: specialty.id.toString(),
    label: specialty.attributes.name,
  })),
];

export const formatString = (input: string) =>
  input.toLowerCase().replace(/\s+/g, '_');

export const getRoleIdByName = (roles: RolePermission[], roleName: string) =>
  roles.find((role) => role.name === roleName)?.id;
