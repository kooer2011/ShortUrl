import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyAzh3xeoOQy0JTj5OI3u1ij1ziAAFwQTWw',
  authDomain: 'shorteiei-b7893.firebaseapp.com',
  projectId: 'shorteiei-b7893',
  storageBucket: 'shorteiei-b7893.appspot.com',
  messagingSenderId: '16588072459',
  appId: '1:16588072459:web:c1017029b913da27c3c90e',
  measurementId: 'G-5SN1Q8HM7H',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { firestore, auth, firebase };
