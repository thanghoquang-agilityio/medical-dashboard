'use client';

import { useEffect, useRef, useState } from 'react';
import { onMessage, Unsubscribe } from 'firebase/messaging';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/toast';
import { fetchToken, messaging } from '@/config/firebase.config';
import { registerFCM } from '@/services/notificationFirebase';

async function getNotificationPermissionAndToken() {
  // Step 1: Check if Notifications are supported in the browser.
  if (!('Notification' in window)) {
    return null;
  }

  // Step 2: Check if permission is already granted.
  if (Notification.permission === 'granted') {
    return await fetchToken();
  }

  // Step 3: If permission is not denied, request permission from the user.
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      return await fetchToken();
    }
  }

  // console.log('Notification permission not granted.');
  return null;
}

export const useFcmToken = () => {
  const router = useRouter(); // Initialize the router for navigation.
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermission | null>(null); // State to store the notification permission status.
  const [token, setToken] = useState<string | null>(null); // State to store the FCM token.
  const retryLoadToken = useRef(0); // Ref to keep track of retry attempts.
  const isLoading = useRef(false); // Ref to keep track if a token fetch is currently in progress.
  const openToast = useToast();
  const { refresh } = useRouter();

  const loadToken = async () => {
    // Step 4: Prevent multiple fetches if already fetched or in progress.
    if (isLoading.current) return;

    isLoading.current = true; // Mark loading as in progress.
    const token = await getNotificationPermissionAndToken(); // Fetch the token.

    // Step 5: Handle the case where permission is denied.
    if (Notification.permission === 'denied') {
      setNotificationPermissionStatus('denied');

      isLoading.current = false;
      return;
    }

    // Step 6: Retry fetching the token if necessary. (up to 3 times)
    // This step is typical initially as the service worker may not be ready/installed yet.
    if (!token) {
      if (retryLoadToken.current >= 3) {
        alert('Unable to load token, refresh the browser');

        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      isLoading.current = false;
      await loadToken();
      return;
    }

    // Step 7: Set the fetched token and save to cookie, then mark as fetched.
    setNotificationPermissionStatus(Notification.permission);
    setToken(token);

    const cookiePayload = {
      key: 'fcm_token',
      value: token,
    };

    await fetch('/api/save-to-cookie', {
      body: JSON.stringify(cookiePayload),
      method: 'POST',
    });

    isLoading.current = false;

    // Check and add if the token has already been in firebase storage or not
    registerFCM({
      token,
    });
  };

  useEffect(() => {
    // Step 8: Initialize token loading when the component mounts.
    if ('Notification' in window) {
      loadToken();
    }
  }, []);

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return; // Exit if no token is available.

      // console.log(`onMessage registered with token ${token}`);

      const message = await messaging();
      if (!message) return;

      // Step 9: Register a listener for incoming FCM messages.
      const unsubscribe = onMessage(message, (payload) => {
        if (Notification.permission !== 'granted') return;
        // console.log('Foreground push notification received:', payload);

        const { body = 'You have a new notification' } =
          payload.notification || {};

        openToast({ message: body });

        refresh();
      });

      return unsubscribe;
    };

    let unsubscribe: Unsubscribe | null = null;

    setupListener().then((unsub) => {
      if (unsub) {
        unsubscribe = unsub;
      }
    });

    // Step 11: Cleanup the listener when the component unmounts.
    return () => unsubscribe?.();
  }, [token, router, openToast, refresh]);

  return { token, notificationPermissionStatus }; // Return the token and permission status.
};
