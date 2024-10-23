/* eslint-disable no-undef */
importScripts(
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js',
);

const firebaseConfig = {
  apiKey: 'AIzaSyCgtLM8Dh_Bh_v0RsKhmFc4WROEsHwk-64',
  authDomain: 'medical-d0eba.firebaseapp.com',
  projectId: 'medical-d0eba',
  storageBucket: 'medical-d0eba.appspot.com',
  messagingSenderId: '849892781571',
  appId: '1:849892781571:web:3858388a396b96fbc7a836',
  measurementId: 'G-R7D3EDCRNZ',
};

firebase.initializeApp(firebaseConfig);

firebase.messaging();
