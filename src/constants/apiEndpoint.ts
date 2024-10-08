export const API_ENDPOINT = {
  AUTH: '/auth/local',
  APPOINTMENTS: '/appointments',
  NOTIFICATIONS: '/notifications',
  SPECIALTIES: '/specialties',
  USERS: '/users',
  UPLOAD: '/upload',
  CHEMISTS: '/chemists',
  PERMISSIONS: '/users-permissions',
};

export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
export const API_IMAGE_URL = process.env.NEXT_PUBLIC_API_URL;

export const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;
