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

export const ROUTE_ENDPOINT = {
  AUTH: {
    LOGIN: 'api/auth/login',
    LOGIN_NEXT_AUTH: 'api/auth/login-next-auth',
    SIGNUP: 'api/auth/signup',
  },
  USER: {
    UPDATE_PUBLISH: 'api/user/update-publish',
  },
  CHEMISTS: {
    ADD_TO_CHEMISTS: 'api/chemists/add-to-chemists',
  },
};

export const LOCAL_HOST = 'http://localhost:3000';
