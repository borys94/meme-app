import request from "supertest";
import {app} from "../../../app";
import firebase from "../../../services/firebaseService";
import firestoreService from "../../../services/firestoreService";
import {COLLECTIONS} from "../../../../../shared/models/collections";
import {createUser, addFavourite, createTemplate, createAdminUser} from "../../../testUtils";
import {TemplateModel} from "../../../../../shared/models/template";

it("fail when not logged user wants to remove a favourite meme", async () => {
  await request(app)
      .delete("/users/user-id/favourites/templateId")
      .send().expect(401);
});

it("fail when template does not exist", async () => {
  const userId = await createUser();
  const adminId = await createAdminUser();
  await createTemplate(adminId);

  await request(app)
      .delete(`/users/${userId}/favourites/non-existing-template`)
      .set("Token", userId)
      .send()
      .expect(400);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.FAVOURITES).get();
  const favourite = firestoreService.getDocsWithID<TemplateModel>(snap);
  expect(favourite).toHaveLength(0);
});

it("fail when tries to remove favourite meme from other user", async () => {
  const userId = await createUser();
  const userId2 = await createUser();
  const adminId = await createAdminUser();
  const templateId = await createTemplate(adminId);
  await addFavourite(userId2, templateId);

  await request(app)
      .delete(`/users/${userId2}/favourites/${templateId}`)
      .set("Token", userId)
      .expect(401);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.FAVOURITES).get();
  const favourite = firestoreService.getDocsWithID<TemplateModel>(snap);
  expect(favourite).toHaveLength(0);
});

it("success when remove user favourite meme", async () => {
  const userId = await createUser();
  const adminId = await createAdminUser();
  const templateId = await createTemplate(adminId);
  await addFavourite(userId, templateId);

  await request(app)
      .delete(`/users/${userId}/favourites/${templateId}`)
      .set("Token", userId)
      .send()
      .expect(200);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.FAVOURITES).get();
  const favourite = firestoreService.getDocsWithID<TemplateModel>(snap);
  expect(favourite).toHaveLength(0);
});

it("fail when remove a favourite meme twice", async () => {
  const userId = await createUser();
  const adminId = await createAdminUser();
  const templateId = await createTemplate(adminId);
  await addFavourite(userId, templateId);

  await request(app)
      .delete(`/users/${userId}/favourites/${templateId}`)
      .set("Token", userId)
      .send()
      .expect(200);
  await request(app)
      .delete(`/users/${userId}/favourites/${templateId}`)
      .set("Token", userId)
      .send()
      .expect(400);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.FAVOURITES).get();
  const favourite = firestoreService.getDocsWithID<TemplateModel>(snap);
  expect(favourite).toHaveLength(0);
});
