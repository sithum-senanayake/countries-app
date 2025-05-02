import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAudNbQbREQi27wksqp13lFvdUceybHqlU",
  authDomain: "af-2-sithum-senanayake.firebaseapp.com",
  projectId: "af-2-sithum-senanayake",
  storageBucket: "af-2-sithum-senanayake.firebasestorage.app",
  messagingSenderId: "492853264147",
  appId: "1:492853264147:web:1ccf41ce45d0055a24a4e6",
  measurementId: "G-NETXL39C36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db }