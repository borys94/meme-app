import request from "supertest";
import {app} from "../../../app";
import firebase from "../../../services/firebaseService";
import firestoreService from "../../../services/firestoreService";
import {COLLECTIONS} from "../../../../../shared/models/collections";
import {UserModel} from "../../../../../shared/models/user";

it("success when created a user", async () => {
  const response = await request(app).post("/auth/signUp")
      .send({
        email: "test",
        password: "password",
      }).expect(200);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(response.body.data).get();
  const user = firestoreService.getDocWithID<UserModel>(snap);

  expect(user.id).toBe(response.body.data);
  expect(user.email).toBe("test");
  expect(typeof user.createdAt).toBe("number");
});
