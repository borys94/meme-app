import request from "supertest";
import {app} from "../../../../app";
import firebase from "../../../../services/firebaseService";
import firestoreService from "../../../../services/firestoreService";
import {COLLECTIONS} from "../../../../../../shared/models/collections";
import {TemplateModel, TEMPLATE_STATUS} from "../../../../../../shared/models/template";
import {createAdminUser, createUser} from "../../../../testUtils";

it("fail when not logged user wants to create a template", async () => {
  await request(app)
      .post("/admin/templates")
      .send({
        image: "base64image",
        title: "title",
        status: TEMPLATE_STATUS.PUBLISHED,
      }).expect(401);
});

it("fail when not admin wants to create a template", async () => {
  await createUser("email", "id");

  await request(app)
      .post("/admin/templates")
      .set("Token", "id")
      .send({
        image: "base64image",
        title: "title",
        status: TEMPLATE_STATUS.PUBLISHED,
      }).expect(401);

  const snap = await firebase.firestore.collection(COLLECTIONS.TEMPLATES).get();
  const templates = firestoreService.getDocsWithID<TemplateModel>(snap);
  expect(templates.length).toBe(0);
});

it("success when created a template", async () => {
  await createAdminUser("email", "adminId");

  const response = await request(app)
      .post("/admin/templates")
      .set("Token", "adminId")
      .send({
        image: "base64image",
        title: "title",
        status: TEMPLATE_STATUS.PUBLISHED,
      }).expect(200);

  const snap = await firebase.firestore.collection(COLLECTIONS.TEMPLATES).doc(response.body.data).get();
  const template = firestoreService.getDocWithID<TemplateModel>(snap);
  expect(template).not.toBeNull();
});
