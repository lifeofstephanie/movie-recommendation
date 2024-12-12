// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Add this if using Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Add this if using Firestore
import { getStorage } from "firebase/storage"; // Add this if using Firebase Storage

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXK4T5sr9EBjoRfOi3ykMcZR2Z-qFeLU0",
  authDomain: "moviemate-b2de3.firebaseapp.com",
  projectId: "moviemate-b2de3",
  storageBucket: "moviemate-b2de3.appspot.com", // Corrected storage bucket URL
  messagingSenderId: "653022928450",
  appId: "1:653022928450:web:2ef5357c72bfea467c97db",
  measurementId: "G-FSDNVX79FH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Services
export const analytics = getAnalytics(app); // Analytics
export const auth = getAuth(app); // Authentication
export const db = getFirestore(app); // Firestore database
export const storage = getStorage(app); // Storage (optional if needed)

// Default export
export default app;
