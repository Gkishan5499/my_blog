// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blogs-9de0d.firebaseapp.com",
  projectId: "mern-blogs-9de0d",
  storageBucket: "mern-blogs-9de0d.appspot.com",
  messagingSenderId: "670366636488",
  appId: "1:670366636488:web:fa2e6b00b3ba81fee488fd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);