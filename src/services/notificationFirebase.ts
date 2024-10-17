'use server';

import { auth } from '@/config/auth';
import { db } from '@/config/firebase.config';
import { REGISTRATION_TOKENS } from '@/constants';
import { ROLE } from '@/types';
import admin from 'firebase-admin';
import { MulticastMessage } from 'firebase-admin/messaging';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const sendNotification = async ({ message }: { message: string }) => {
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
    const registrationTokens = await getFCMTokens();

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

export const getFCMTokens = async () => {
  const { email = '', role = ROLE.NORMAL_USER } = (await auth())?.user || {};

  const adminDocSnap = await getDoc(doc(db, REGISTRATION_TOKENS, 'admin'));

  const { tokens: adminRegistrationTokens } = (adminDocSnap.data() as {
    tokens: Array<string>;
  }) || {
    tokens: [],
  };

  if (role === ROLE.ADMIN) {
    return adminRegistrationTokens;
  }

  const userDocSnap = await getDoc(doc(db, REGISTRATION_TOKENS, email));

  const { tokens: userRegistrationTokens } = (userDocSnap.data() as {
    tokens: Array<string>;
  }) || {
    tokens: [],
  };

  return [...userRegistrationTokens, ...adminRegistrationTokens];
};

export const registerFCM = async ({ token }: { token: string }) => {
  const { email = '', role } = (await auth())?.user || {};

  const registrationTokens = await getFCMTokens();

  const isRegistered = registrationTokens.some(
    (registerToken) => registerToken === token,
  );

  if (!isRegistered) {
    registrationTokens.push(token);

    const docRef = doc(
      db,
      REGISTRATION_TOKENS,
      role === ROLE.ADMIN ? 'admin' : email,
    );

    await setDoc(docRef, {
      tokens: registrationTokens,
    });
  }
};

export const unregisterFCM = async ({ token }: { token: string }) => {
  const { email = '', role } = (await auth())?.user || {};

  const registrationTokens = await getFCMTokens();

  const filteredTokens = registrationTokens.filter(
    (registrationToken) => registrationToken !== token,
  );

  const docRef = doc(
    db,
    REGISTRATION_TOKENS,
    role === ROLE.ADMIN ? 'admin' : email,
  );

  await setDoc(docRef, {
    tokens: filteredTokens,
  });
};
