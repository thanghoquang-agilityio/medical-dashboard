/* eslint-disable no-undef */
importScripts(
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js',
);

fetch('/api/firebase-config')
  .then((response) => response.json())
  .then(async (firebaseConfig) => {
    // eslint-disable-next-line no-undef
    await firebase.initializeApp(firebaseConfig);
    // eslint-disable-next-line no-undef
    await firebase.messaging();
  });
