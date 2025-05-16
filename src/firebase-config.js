import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDcL6Z_RQZTIH2cCQR2200AJA23zjMpf8",
  authDomain: "ecart-otp-auth.firebaseapp.com",
  projectId: "ecart-otp-auth",
  storageBucket: "ecart-otp-auth.appspot.com",
  messagingSenderId: "387492279169",
  appId: "1:387492279169:web:38aa15a28dfc7e7f042e80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
