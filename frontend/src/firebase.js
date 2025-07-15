// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBMaiVYfZy0HAM9yO3sNrK3blgTiLSZHmE",
  authDomain: "smart-setu-ai.firebaseapp.com",
  projectId: "smart-setu-ai",
  storageBucket: "smart-setu-ai.appspot.com",
  messagingSenderId: "212141488581",
  appId: "1:212141488581:web:eb4a199bf4b4e22c4ef3ac"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
