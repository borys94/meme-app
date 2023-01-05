import request from "supertest";
import {app} from "../../../../app";
import firebase from "../../../../services/firebaseService";
import firestoreService from "../../../../services/firestoreService";
import {COLLECTIONS} from "../../../../../../shared/models/collections";
import {createAdminUser, createUser} from "../../../../testUtils";
import {UserModel, USER_ROLES} from "../../../../../../shared/models/user";

it("fail when not logged user wants to update user role", async () => {
  await request(app)
      .put("/admin/users/id")
      .send({
        role: USER_ROLES.ADMIN,
      }).expect(401);
});

it("fail when not admin wants to update user role", async () => {
  const userId = await createUser("userEmail");

  await request(app)
      .put(`/admin/users/${userId}`)
      .set("Token", "id")
      .send({
        role: USER_ROLES.ADMIN,
      }).expect(401);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).get();
  const user = firestoreService.getDocsWithID<UserModel>(snap).find((user) => user.id === userId);
  expect(user?.role).toBe(USER_ROLES.USER);
});

it("fail when data is missing", async () => {
  const userId = await createUser("userEmail");
  const adminId = await createAdminUser("adminEmail");

  await request(app)
      .put(`/admin/users/${userId}`)
      .set("Token", adminId)
      .send({})
      .expect(400);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).get();
  const user = firestoreService.getDocsWithID<UserModel>(snap).find((user) => user.id === userId);
  expect(user?.role).toBe(USER_ROLES.USER);
});

it("fail when userRole is wrong", async () => {
  const userId = await createUser("userEmail");
  const adminId = await createAdminUser("adminEmail");

  await request(app)
      .put(`/admin/users/${userId}`)
      .set("Token", adminId)
      .send({
        role: "non-existing-role",
      })
      .expect(400);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).get();
  const user = firestoreService.getDocsWithID<UserModel>(snap).find((user) => user.id === userId);
  expect(user?.role).toBe(USER_ROLES.USER);
});

it("success when updated user role", async () => {
  const userId = await createUser("userEmail");
  const adminId = await createAdminUser("adminEmail");

  await request(app)
      .put(`/admin/users/${userId}`)
      .set("Token", adminId)
      .send({
        role: USER_ROLES.ADMIN,
      }).expect(200);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).get();
  const user = firestoreService.getDocsWithID<UserModel>(snap).find((user) => user.id === userId);
  expect(user?.role).toBe(USER_ROLES.ADMIN);
});
