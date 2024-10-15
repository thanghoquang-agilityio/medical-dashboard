'use server';

import { db } from '@/config/firebase.config';
import { REGISTRATION_TOKENS } from '@/constants';
import admin from 'firebase-admin';
import { MulticastMessage } from 'firebase-admin/messaging';
import { doc, getDoc } from 'firebase/firestore';

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
    const docSnapshot = await getDoc(doc(db, REGISTRATION_TOKENS, email));

    const { tokens: registrationTokens } = (docSnapshot.data() as {
      tokens: Array<string>;
    }) || {
      tokens: [],
    };

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
