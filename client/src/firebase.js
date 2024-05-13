// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a5a24.firebaseapp.com",
  projectId: "mern-estate-a5a24",
  storageBucket: "mern-estate-a5a24.appspot.com",
  messagingSenderId: "626474585234",
  appId: "1:626474585234:web:4ec774152522c31cc66a4b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);