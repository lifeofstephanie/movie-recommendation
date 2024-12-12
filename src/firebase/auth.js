// src/firebase/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

// Sign Up Function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Returns the created user object
  } catch (error) {
    throw error; // Handle error in your UI
  }
};

// Log In Function
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Returns the logged-in user object
  } catch (error) {
    throw error; // Handle error in your UI
  }
};

// Log Out Function
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error; // Handle error in your UI
  }
};
