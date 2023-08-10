import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import app from '../firebaseConfig.js';

const firestore = getFirestore(app);
const storage = getStorage(app);
export default { app, firestore, storage, ref, uploadBytes };
