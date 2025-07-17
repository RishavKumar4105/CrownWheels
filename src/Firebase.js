// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa0inaQx614gwKuG5veWTKnnqXCpGmQp4",
  authDomain: "limelite-f28a4.firebaseapp.com",
  projectId: "limelite-f28a4",
  storageBucket: "limelite-f28a4.appspot.com",
  messagingSenderId: "192935555289",
  appId: "1:192935555289:web:49332fccf6c1f406544ec8",
  measurementId: "G-NW8QY8JEGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { app, analytics,auth,db,storage};

