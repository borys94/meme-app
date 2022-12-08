
import {initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
import {getFirestore} from "firebase-admin/firestore";

const app = initializeApp();
const auth = getAuth(app);
const firestore = getFirestore(app);

const firebase = {
  auth,
  firestore,
};

export default firebase;
