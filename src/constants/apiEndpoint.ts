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
export const IMGBB_URL = `${process.env.NEXT_PUBLIC_IMGBB_URL}?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

export const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;
