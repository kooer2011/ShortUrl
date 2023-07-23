import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBGGy1cBcw8R4OIIzsXnN9Fa48SMpTWzDo',
  authDomain: 'shortner-ac3b4.firebaseapp.com',
  projectId: 'shortner-ac3b4',
  storageBucket: 'shortner-ac3b4.appspot.com',
  messagingSenderId: '349491925331',
  appId: '1:349491925331:web:71d8bfd876f3af7580d1a6',
  measurementId: 'G-J5Z6EX90Y6',
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
