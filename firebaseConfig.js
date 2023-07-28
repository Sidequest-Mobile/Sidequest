// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABBy6Zt123AJ1SbTStgXJFkyV8fkICnLw",
  authDomain: "side-quest-646e9.firebaseapp.com",
  projectId: "side-quest-646e9",
  storageBucket: "side-quest-646e9.appspot.com",
  messagingSenderId: "538609177216",
  appId: "1:538609177216:web:33c92aa73a9d133ee40c65",
  measurementId: "G-P89YS9VM7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app