import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBlcmmbnJeedC0qGBvwSuhGCUQY5GfP5g',
  authDomain: 'enterpedia-1a883.firebaseapp.com',
  projectId: 'enterpedia-1a883',
  storageBucket: 'enterpedia-1a883.firebasestorage.app',
  messagingSenderId: '799229192283',
  appId: '1:799229192283:web:dd1e80709eefc8088be33b',
  measurementId: 'G-B4J4101RRS'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
