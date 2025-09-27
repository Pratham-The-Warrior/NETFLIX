import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Map Firebase error codes to user-friendly messages
const authErrorMessages = {
  "auth/invalid-credential": "Invalid email or password. Please try again.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Try again.",
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/network-request-failed": "Network error. Check your connection.",
};

// Helper function to show friendly error messages
const showAuthError = (error) => {
  const message =
    authErrorMessages[error.code] || "Something went wrong. Please try again.";
  toast.error(message);
  console.error(error); // keep for debugging
};

// SIGNUP
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("Signup successful! Welcome 🎉");
  } catch (error) {
    showAuthError(error);
  }
};

// LOGIN
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful ✅");
  } catch (error) {
    showAuthError(error);
  }
};

// LOGOUT
const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully 👋");
  } catch (error) {
    showAuthError(error);
  }
};

export { auth, db, signup, login, logout };
