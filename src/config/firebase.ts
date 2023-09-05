import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYpTbAFDCQIyKZd-Ylok-bKM6IAWK8Ffo",
  authDomain: "queuing-system-f5dcc.firebaseapp.com",
  projectId: "queuing-system-f5dcc",
  storageBucket: "queuing-system-f5dcc.appspot.com",
  messagingSenderId: "118428025110",
  appId: "1:118428025110:web:35727f134ea82720bb9037",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
