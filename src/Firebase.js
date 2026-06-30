import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7FSTh868b0NEjQSjqQGvAFMAJDYkxFo0",
  authDomain: "job-portal-89a75.firebaseapp.com",
  projectId: "job-portal-89a75",
  storageBucket: "job-portal-89a75.firebasestorage.app",
  messagingSenderId: "944201243336",
  appId: "1:944201243336:web:2edb7b2aab320af90923fd"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);