
import {initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
import {getFirestore} from "firebase-admin/firestore";
import {getStorage} from "firebase-admin/storage";

const app = initializeApp();
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const firebase = {
  auth,
  firestore,
  storage,
};

export default firebase;
