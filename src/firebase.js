import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcwtULhnWaASKPax-saNyWw-aWWLZVF1Y",
  authDomain: "chat-reactweb.firebaseapp.com",
  projectId: "chat-reactweb",
  storageBucket: "chat-reactweb.appspot.com",
  messagingSenderId: "671848085694",
  appId: "1:671848085694:web:3288acdbe7bb62592146ef",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
