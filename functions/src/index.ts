import {region, https} from "firebase-functions";

import {app} from "./app";
import firebase from "./services/firebaseService";

import {USER_ROLES} from "../../shared/models/user";
import {COLLECTIONS} from "../../shared/models/collections";

exports.api = region("europe-west1").https.onRequest(app);

exports.addAdminRole = https.onCall(async (data, context) => {
  try {
    const user = await firebase.auth.getUserByEmail(data.email);
    await firebase.auth.setCustomUserClaims(user.uid, {
      role: USER_ROLES.ADMIN,
    });
    await firebase.firestore.collection(COLLECTIONS.USERS).doc(user.uid).update({
      role: USER_ROLES.ADMIN,
    });
    return {
      message: `${data.email} has been made an admin`,
    };
  } catch (error) {
    return error;
  }
});
