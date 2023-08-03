import app from '../firebaseConfig.js';
import { getFirestore } from "firebase/firestore"
let firestore = getFirestore(app)

export default  { app, firestore } ;
