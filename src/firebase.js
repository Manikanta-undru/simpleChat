import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANnVDcrbSq9xOr02YSLFMegv7ymNzGC0E",
  authDomain: "funchatweb.firebaseapp.com",
  projectId: "funchatweb",
  storageBucket: "funchatweb.appspot.com",
  messagingSenderId: "705956741924",
  appId: "1:705956741924:web:b77ee7cea389401cbf29b1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
