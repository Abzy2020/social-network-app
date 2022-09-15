import {initializeApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD1AuADX13ljsqtRj2128Ih8wGxt_YhwaQ",
    authDomain: "zbou-2a453.firebaseapp.com",
    projectId: "zbou-2a453",
    storageBucket: "zbou-2a453.appspot.com",
    messagingSenderId: "774583271486",
    appId: "1:774583271486:web:baa8f0558b2689615e116f",
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export default db;
