process.env.GCLOUD_PROJECT = "meme-app-test";
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

import firebaseService from "./services/firebaseService";
import crypto from "crypto";
import {COLLECTIONS} from "../../shared/models/collections";

beforeEach(async () => {
  const templates = await firebaseService.firestore.collection(COLLECTIONS.TEMPLATES).get();
  templates.forEach((elem) => elem.ref.delete());

  const users = await firebaseService.firestore.collection(COLLECTIONS.USERS).get();
  users.forEach((elem) => elem.ref.delete());
});

(firebaseService.auth.verifyIdToken as unknown) = jest.fn().mockImplementation((token) => {
  return {uid: token};
});

(firebaseService.auth.createUser as unknown) = jest.fn().mockImplementation(({email}) => {
  return {
    email,
    uid: crypto.randomUUID(),
  };
});

jest.mock("./utils/createPublicFile", () => ({
  createPublicFile: (buffer: Buffer, path: string) => path,
}));

