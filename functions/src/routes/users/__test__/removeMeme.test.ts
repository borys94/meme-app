import request from "supertest";
import {app} from "../../../app";
import firebase from "../../../services/firebaseService";
import firestoreService from "../../../services/firestoreService";
import {COLLECTIONS} from "../../../../../shared/models/collections";
import {createUser, addFavourite, addMeme, createTemplate, createAdminUser} from "../../../testUtils";
import {TemplateModel} from "../../../../../shared/models/template";
import {MemeModel} from "../../../../../shared/models/meme";

it("fail when not logged user wants to remove a meme", async () => {
  await request(app)
      .delete("/users/userId/memes/memeId")
      .send()
      .expect(401);
});

it("fail when meme does not exist", async () => {
  const userId = await createUser();
  const adminId = await createAdminUser();
  await createTemplate(adminId);

  await request(app)
      .delete(`/users/${userId}/memes/non-existing`)
      .set("Token", userId)
      .send()
      .expect(404);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.MEMES).get();
  const memes = firestoreService.getDocsWithID<MemeModel>(snap);
  expect(memes).toHaveLength(0);
});

it("fail when tries to remove a meme from other user", async () => {
  const userId = await createUser();
  const userId2 = await createUser();
  const adminId = await createAdminUser();
  const templateId = await createTemplate(adminId);
  await addFavourite(userId2, templateId);

  await request(app)
      .delete(`/users/${userId}/memes/non-existing`)
      .set("Token", userId2)
      .expect(401);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.MEMES).get();
  const memes = firestoreService.getDocsWithID<TemplateModel>(snap);
  expect(memes).toHaveLength(0);
});

it("success when remove a user meme", async () => {
  const userId = await createUser();
  const adminId = await createAdminUser();
  const templateId = await createTemplate(adminId);
  const memeId = await addMeme(userId, templateId);

  await request(app)
      .delete(`/users/${userId}/memes/${memeId}`)
      .set("Token", userId)
      .send()
      .expect(200);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.MEMES).get();
  const memes = firestoreService.getDocsWithID<TemplateModel>(snap);
  expect(memes).toHaveLength(0);
});

it("fail when remove a favourite meme twice", async () => {
  const userId = await createUser();
  const adminId = await createAdminUser();
  const templateId = await createTemplate(adminId);
  const memeId = await addMeme(userId, templateId);

  await request(app)
      .delete(`/users/${userId}/memes/${memeId}`)
      .set("Token", userId)
      .send()
      .expect(200);
  await request(app)
      .delete(`/users/${userId}/memes/${memeId}`)
      .set("Token", userId)
      .send()
      .expect(404);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.MEMES).get();
  const memes = firestoreService.getDocsWithID<TemplateModel>(snap);
  expect(memes).toHaveLength(0);
});
