import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "fir-learning-396d9.firebaseapp.com",
  projectId: "fir-learning-396d9",
  storageBucket: "fir-learning-396d9.appspot.com",
  messagingSenderId: "57873817603",
  appId: "1:57873817603:web:f159f8550fd36077a76e36"
};

const app = initializeApp(firebaseConfig);