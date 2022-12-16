// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY as string,
  authDomain: "lucasamonrc-herald.firebaseapp.com",
  projectId: "lucasamonrc-herald",
  storageBucket: "lucasamonrc-herald.appspot.com",
  messagingSenderId: "496501891943",
  appId: "1:496501891943:web:b6468b7e8c927e37dbc5c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;