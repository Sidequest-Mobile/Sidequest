import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

import app from '../firebaseConfig.js';

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export default { app, firestore, storage, ref, uploadBytes, auth };
