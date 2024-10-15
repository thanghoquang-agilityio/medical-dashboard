/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

// Fetch the Firebase config from your API route
fetch('/api/firebase-config')
  .then((response) => response.json())
  .then((firebaseConfig) => {
    firebase.initializeApp(firebaseConfig);

    firebase.messaging();
  });
