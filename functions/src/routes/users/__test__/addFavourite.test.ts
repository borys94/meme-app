import request from "supertest";
import {app} from "../../../app";
import firebase from "../../../services/firebaseService";
import firestoreService from "../../../services/firestoreService";
import {COLLECTIONS} from "../../../../../shared/models/collections";
import {createUser, createTemplate, createAdminUser} from "../../../testUtils";
import {TemplateModel} from "../../../../../shared/models/template";

it("fail when not logged user wants to add a favourite meme", async () => {
  await request(app)
      .post("/users/user-id/favourites")
      .send({
        templateId: "templateId",
      }).expect(401);
});

it("fail when data is missing", async () => {
  const userId = await createUser("userEmail");

  await request(app)
      .post(`/users/${userId}/favourites`)
      .set("Token", userId)
      .send({ })
      .expect(400);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.FAVOURITES).get();
  const favourite = firestoreService.getDocsWithID<TemplateModel>(snap);
  expect(favourite).toHaveLength(0);
});

it("fail when template does not exist", async () => {
  const userId = await createUser("userEmail");
  const adminId = await createAdminUser("adminEmail");
  await createTemplate(adminId);

  await request(app)
      .post(`/users/${userId}/favourites`)
      .set("Token", userId)
      .send({templateId: "non-existing-template"})
      .expect(404);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.FAVOURITES).get();
  const favourite = firestoreService.getDocsWithID<TemplateModel>(snap);
  expect(favourite).toHaveLength(0);
});

it("fail when tries to add favourite meme to other user", async () => {
  const userId = await createUser("userEmail");
  const userId2 = await createUser("userEmail2");
  const adminId = await createAdminUser("adminEmail");
  const templateId = await createTemplate(adminId);

  await request(app)
      .post(`/users/${userId2}/favourites`)
      .set("Token", userId)
      .send({templateId})
      .expect(401);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.FAVOURITES).get();
  const favourite = firestoreService.getDocsWithID<TemplateModel>(snap);
  expect(favourite).toHaveLength(0);
});

it("success when add user favourite meme", async () => {
  const userId = await createUser("userEmail");
  const adminId = await createAdminUser("adminEmail");
  const templateId = await createTemplate(adminId);

  await request(app)
      .post(`/users/${userId}/favourites`)
      .set("Token", userId)
      .send({templateId}).expect(201);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.FAVOURITES).get();
  const favourite = firestoreService.getDocsWithID<TemplateModel>(snap);
  expect(favourite).toHaveLength(1);
  expect(favourite[0].id).toBe(templateId);
});
