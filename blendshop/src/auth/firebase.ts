import { initializeApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBdiPpOr_Q7m1v3INg4-cVD9XxB3QEeHq4",
  authDomain: "blendshop-3ccc9.firebaseapp.com",
  projectId: "blendshop-3ccc9",
  storageBucket: "blendshop-3ccc9.appspot.com",
  messagingSenderId: "305568299053",
  appId: "1:305568299053:web:60fc54f55b8b69c148a0a4",
  measurementId: "G-9GHF0BJ2TC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;