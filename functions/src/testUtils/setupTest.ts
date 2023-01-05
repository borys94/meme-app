process.env.GCLOUD_PROJECT = "meme-app-test";
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

import crypto from "crypto";
import firebaseService from "../services/firebaseService";
import {COLLECTIONS} from "../../../shared/models/collections";

beforeEach(async () => {
  await deleteCollection(COLLECTIONS.FAVOURITES);
  await deleteCollection(COLLECTIONS.MEMES);
  await deleteCollection(COLLECTIONS.TEMPLATES);
  await deleteCollection(COLLECTIONS.USERS);
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

(firebaseService.auth.setCustomUserClaims as unknown) = jest.fn().mockImplementation(() => null);

jest.mock("../services/storageService", () => ({
  createFile: (buffer: Buffer, path: string) => path,
  deleteFile: () => null,
}));

const deleteCollection = async (path: string) => {
  await firebaseService.firestore.recursiveDelete(firebaseService.firestore.collection(path));
};
