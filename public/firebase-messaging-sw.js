/* eslint-disable no-undef */
importScripts(
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js',
);

// Fetch the Firebase config from your API route
fetch('/api/firebase-config')
  .then((response) => response.json())
  .then((firebaseConfig) => {
    firebase.initializeApp(firebaseConfig);

    firebase.messaging();
  });
