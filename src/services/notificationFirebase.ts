'use server';

import { db } from '@/config/firebase.config';
import { REGISTRATION_TOKENS } from '@/constants';
import admin from 'firebase-admin';
import { MulticastMessage } from 'firebase-admin/messaging';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const sendNotification = async ({
  message,
  email,
}: {
  message: string;
  email: string;
}) => {
  // Make sure there is only one firebase admin instance
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATEKEY,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      }),
    });
  }

  try {
    const registrationTokens = await getFCMTokens(email);

    const payload: MulticastMessage = {
      tokens: registrationTokens,
      notification: {
        body: message,
      },
    };

    await admin.messaging().sendEachForMulticast(payload);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred in the request send notification';
    return { user: null, error: errorMessage };
  }
};

export const getFCMTokens = async (email: string) => {
  const docSnap = await getDoc(doc(db, REGISTRATION_TOKENS, email));

  const { tokens: registrationTokens } = (docSnap.data() as {
    tokens: Array<string>;
  }) || {
    tokens: [],
  };

  return registrationTokens;
};

export const registerFCM = async ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  const registrationTokens = await getFCMTokens(email);

  const isRegistered = registrationTokens.some(
    (registerToken) => registerToken === token,
  );

  if (!isRegistered) {
    registrationTokens.push(token);
    await setDoc(doc(db, REGISTRATION_TOKENS, email), {
      tokens: registrationTokens,
    });
  }
};

export const unregisterFCM = async ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  const registrationTokens = await getFCMTokens(email);

  const filteredTokens = registrationTokens.filter(
    (registrationToken) => registrationToken !== token,
  );

  await setDoc(doc(db, REGISTRATION_TOKENS, email), {
    tokens: filteredTokens,
  });
};
