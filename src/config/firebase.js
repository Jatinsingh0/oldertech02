// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMCny64JD_nyMuLOhN2En-66RCO6hD7wk",
  authDomain: "clicrecycle-testing.firebaseapp.com",
  projectId: "clicrecycle-testing",
  storageBucket: "clicrecycle-testing.appspot.com",
  messagingSenderId: "157185006060",
  appId: "1:157185006060:web:16b36dd264e09857ef48c9",
  measurementId: "G-37YJKFZM75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
