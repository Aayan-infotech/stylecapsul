// src/firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCkoIJIOoLva_FZy2mGdgSldnscSni92LM",
  authDomain: "style-capsule-b266a.firebaseapp.com",
  databaseURL: "https://style-capsule-b266a-default-rtdb.firebaseio.com",
  projectId: "style-capsule-b266a",
  storageBucket: "style-capsule-b266a.appspot.com",
  messagingSenderId: "621905055760",
  appId: "1:621905055760:web:5cb33e10b6792151797a95",
  measurementId: "G-WRNWY3NTVK"
};

// Initialize Firebase app only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// Optional: Only use analytics if window is defined (not on server)
if (typeof window !== "undefined") {
  getAnalytics(app);
}

export { db };
