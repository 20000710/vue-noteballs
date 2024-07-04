import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2m8Y4rFAd8p-DEI6NBTXR9JYAV6JkVIg",
  authDomain: "noteballs-d1c03.firebaseapp.com",
  projectId: "noteballs-d1c03",
  storageBucket: "noteballs-d1c03.appspot.com",
  messagingSenderId: "316114384904",
  appId: "1:316114384904:web:c25f97618e111765f9f9bd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {
  db,
  auth
}