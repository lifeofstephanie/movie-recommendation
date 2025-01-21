// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBz1BJanICtF6sCFgXbKp-mHcHVt0QoxE",
  authDomain: "moviemate-b2de3.firebaseapp.com",
  databaseURL: "https://moviemate-b2de3-default-rtdb.firebaseio.com",
  projectId: "moviemate-b2de3",
  storageBucket: "moviemate-b2de3.firebasestorage.app",
  messagingSenderId: "653022928450",
  appId: "1:653022928450:web:f8bce9426ef0ad3a7c97db",
  measurementId: "G-DGNR7T4W8K",
};

export const addMovieToCategory = async (movieId, category) => {
  try {
    const movieRef = doc(db, "watchlist", movieId); // Movie document reference
    await setDoc(movieRef, {
      category: category, // Category (e.g., 'Currently Watching', 'Watched')
      addedAt: new Date(), // Timestamp for when it was added
    });

    console.log(`Movie added to ${category} category!`);
  } catch (err) {
    console.error("Error adding movie to category:", err);
  }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
export const analytics = getAnalytics(app);
