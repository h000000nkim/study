import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIvvwaekvCEwKx6kqbGwomlujcmo3jb0Y",
  authDomain: "study-record-h000000nkim.firebaseapp.com",
  projectId: "study-record-h000000nkim",
  storageBucket: "study-record-h000000nkim.firebasestorage.app",
  messagingSenderId: "789144142835",
  appId: "1:789144142835:web:11af0269692cdfcdc34886",
  measurementId: "G-NB4898KXC4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
