import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCshkb_0NU-Yof7x1_R8MLDCCo2dZbTiQU",
  authDomain: "gantz-rpg.firebaseapp.com",
  projectId: "gantz-rpg",
  storageBucket: "gantz-rpg.firebasestorage.app",
  messagingSenderId: "242939584712",
  appId: "1:242939584712:web:cff76b29efaba090fe85fd",
  measurementId: "G-7WF1Q4QSHG"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);