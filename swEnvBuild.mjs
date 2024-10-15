import { writeFileSync, readFileSync } from 'fs';

const envFilePath = './.env.local';
const envContent = readFileSync(envFilePath, 'utf8');

envContent.split('\n').forEach((line) => {
  const [key, value] = line.split('=');
  if (value) process.env[key.trim()] = value.trim();
});

writeFileSync(
  './public/swenv.js',
  `
const process = {
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: '${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}',
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: '${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}',
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: '${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}',
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: '${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}',
    NEXT_PUBLIC_FIREBASE_SENDER_ID: '${process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID}',
    NEXT_PUBLIC_FIREBASE_APP_ID: '${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}',
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}'
  }
};
`,
);
