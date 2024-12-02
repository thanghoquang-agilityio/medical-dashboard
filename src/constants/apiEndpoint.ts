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
    LOGOUT: 'api/auth/logout',
  },
  USER: {
    UPDATE_PUBLISH: 'api/user/update-publish',
    GET_LOGGED: 'api/user/get-logged',
    GET_USERS: 'api/user/get-users',
  },
  CHEMISTS: {
    ADD_TO_CHEMISTS: 'api/chemists/add-to-chemists',
    GET_CHEMISTS: 'api/chemists/get-chemists',
  },
  NOTIFICATIONS: {
    GET_NOTIFICATIONS: 'api/notifications/get-notifications',
  },
  APPOINTMENTS: {
    GET_APPOINTMENTS: 'api/appointments/get-appointments',
    ADD_APPOINTMENT: 'api/appointments/add-appointment',
    UPDATE_APPOINTMENT: 'api/appointments/update-appointment',
    DELETE_APPOINTMENT: 'api/appointments/delete-appointment',
  },
};

export const HOST_DOMAIN = process.env.SITE_HOST ?? 'http://localhost:3000';
