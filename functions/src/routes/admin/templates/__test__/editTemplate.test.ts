import request from "supertest";
import {app} from "../../../../app";
import firebase from "../../../../services/firebaseService";
import firestoreService from "../../../../services/firestoreService";
import {COLLECTIONS} from "../../../../../../shared/models/collections";
import {TemplateModel, TEMPLATE_STATUS} from "../../../../../../shared/models/template";
import {createAdminUser, createUser, createTemplate} from "../../../../testUtils";

it("fail when not logged user wants to edit a template", async () => {
  await request(app)
      .put("/admin/templates")
      .send({
        image: "base64image",
        title: "title",
        status: TEMPLATE_STATUS.PUBLISHED,
      }).expect(401);
});

it("fail when not admin wants to edit a template", async () => {
  const userId = await createUser();
  const adminId = await createAdminUser();

  const templateId = await createTemplate(adminId);

  await request(app)
      .put(`/admin/templates/${templateId}`)
      .set("Token", userId)
      .send({
        image: "base64image",
        title: "new title",
        status: TEMPLATE_STATUS.PUBLISHED,
      }).expect(401);

  const snap = await firebase.firestore.collection(COLLECTIONS.TEMPLATES).doc(templateId).get();
  const template = firestoreService.getDocWithID<TemplateModel>(snap);
  expect(template.title).toBe("title");
});

it("fail when sent data is not completed", async () => {
  await createUser();
  const adminId = await createAdminUser();

  const templateId = await createTemplate(adminId);

  await request(app)
      .put(`/admin/templates/${templateId}`)
      .set("Token", adminId)
      .send({
        title: "new title",
      }).expect(400);

  const snap = await firebase.firestore.collection(COLLECTIONS.TEMPLATES).doc(templateId).get();
  const template = firestoreService.getDocWithID<TemplateModel>(snap);
  expect(template.title).toBe("title");
});

it("success when edited a template", async () => {
  await createUser();
  const adminId = await createAdminUser();

  const templateId = await createTemplate(adminId);

  await request(app)
      .put(`/admin/templates/${templateId}`)
      .set("Token", adminId)
      .send({
        title: "new title",
        texts: "",
        status: TEMPLATE_STATUS.PUBLISHED,
      }).expect(200);

  const snap = await firebase.firestore.collection(COLLECTIONS.TEMPLATES).doc(templateId).get();
  const template = firestoreService.getDocWithID<TemplateModel>(snap);
  expect(template.title).toBe("new title");
});
