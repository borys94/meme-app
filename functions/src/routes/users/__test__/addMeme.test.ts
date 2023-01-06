import request from "supertest";
import {app} from "../../../app";
import firebase from "../../../services/firebaseService";
import firestoreService from "../../../services/firestoreService";
import {COLLECTIONS} from "../../../../../shared/models/collections";
import {createAdminUser, createTemplate, createUser} from "../../../testUtils";
import {MemeModel} from "../../../../../shared/models/meme";

it("fail when not logged user wants to add a favourite meme", async () => {
  await request(app)
      .post("/users/user-id/memes")
      .send({
        image: "img",
        templateId: "templateId",
      }).expect(401);
});

it("fail when data is missing", async () => {
  const userId = await createUser();

  await request(app)
      .post(`/users/${userId}/memes`)
      .set("Token", userId)
      .send({ })
      .expect(400);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.MEMES).get();
  const memes = firestoreService.getDocsWithID<MemeModel>(snap);
  expect(memes).toHaveLength(0);
});

it("fail when tries add meme to other user", async () => {
  const adminId = await createAdminUser();
  const userId = await createUser();
  const userId2 = await createUser();
  const templateId = await createTemplate(adminId);

  await request(app)
      .post(`/users/${userId2}/memes`)
      .set("Token", userId)
      .send({
        templateId,
        image: "image",
      })
      .expect(401);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.MEMES).get();
  const memes = firestoreService.getDocsWithID<MemeModel>(snap);
  expect(memes).toHaveLength(0);
});

it("fail when meme does not exist", async () => {
  const userId = await createUser();

  const response = await request(app)
      .post(`/users/${userId}/memes`)
      .set("Token", userId)
      .send({
        templateId: "non-existing",
        image: "image",
      })
      .expect(404);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.MEMES).get();
  const memes = firestoreService.getDocsWithID<MemeModel>(snap);
  expect(memes).toHaveLength(0);
  expect(response.body.error).toBe("Template not found");
});

it("success when add meme to user", async () => {
  const adminId = await createAdminUser();
  const userId = await createUser();
  const templateId = await createTemplate(adminId);

  await request(app)
      .post(`/users/${userId}/memes`)
      .set("Token", userId)
      .send({
        templateId,
        image: "image",
      })
      .expect(201);

  const snap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.MEMES).get();
  const memes = firestoreService.getDocsWithID<MemeModel>(snap);
  expect(memes).toHaveLength(1);
});
