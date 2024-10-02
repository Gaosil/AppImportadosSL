import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDQWqVEAWgEz8QtJ_kHrqbFW9q6hH60SC8",
  authDomain: "importados-sl.firebaseapp.com",
  projectId: "importados-sl",
  storageBucket: "importados-sl.appspot.com",
  messagingSenderId: "407430655827",
  appId: "1:407430655827:web:4689ebb83113edb8183ba6",
  measurementId: "G-M8RVZCCERG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };