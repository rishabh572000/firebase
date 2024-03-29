import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCM_KUfs1eEtZpP0oUHwN9hP-MDcgld2ak",
  authDomain: "fir-learning-396d9.firebaseapp.com",
  projectId: "fir-learning-396d9",
  storageBucket: "fir-learning-396d9.appspot.com",
  messagingSenderId: "57873817603",
  appId: "1:57873817603:web:f159f8550fd36077a76e36"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);
export const storage = getStorage(app);