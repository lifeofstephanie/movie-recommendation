// src/firebase/firestore.js
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

// Add to Firestore
export const addToWatchlist = async (userId, movieId, movieData) => {
  try {
    await setDoc(doc(db, "watchlists", `${userId}_${movieId}`), movieData);
  } catch (error) {
    throw error; // Handle error in your UI
  }
};

// Fetch Watchlist
export const getWatchlist = async (userId) => {
  try {
    const querySnapshot = await collection(db, "watchlists").where("userId", "==", userId).get();
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    throw error; // Handle error in your UI
  }
};
