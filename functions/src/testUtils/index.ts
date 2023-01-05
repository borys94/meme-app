import request from "supertest";
import crypto from "crypto";

import firebase from "../services/firebaseService";
import {COLLECTIONS} from "../../../shared/models/collections";
import {UserModel, USER_ROLES} from "../../../shared/models/user";
import {app} from "../app";
import {TEMPLATE_STATUS} from "../../../shared/models/template";

export const createAdminUser = async (email: string) => {
  return createFirestoreUser(email, USER_ROLES.ADMIN);
};

export const createUser = async (email: string) => {
  return createFirestoreUser(email, USER_ROLES.USER);
};

const createFirestoreUser = async (email: string, role: USER_ROLES) => {
  const id = crypto.randomUUID();
  const firestoreUser: UserModel = {
    email,
    id,
    createdAt: Date.now(),
    role,
    avatar: null,
  };
  await firebase.firestore.collection(COLLECTIONS.USERS).doc(id).set(firestoreUser);
  return id;
};

export const createTemplate = async (token: string): Promise<string> => {
  const response = await request(app)
      .post("/admin/templates")
      .set("Token", token)
      .send({
        image: "base64image",
        title: "title",
        status: TEMPLATE_STATUS.PUBLISHED,
      });
  return response.body.data;
};
