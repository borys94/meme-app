import crypto from "crypto";

import firebase from "./firebaseService";
import {base64ToBuffer} from "../utils/base64ToBuffer";

export const createFile = async (base64: string, directory: string) => {
  const [buffer, ext] = base64ToBuffer(base64);
  const path = `${directory}/${crypto.randomUUID()}.${ext}`;
  const file = firebase.storage.bucket().file(path);
  await file.save(buffer);
  await file.makePublic();
  return file.publicUrl();
};

export const deleteFile = async (url: string) => {
  url = decodeURIComponent(url);
  const path = url.replace(`https://storage.googleapis.com/${process.env.GCLOUD_PROJECT}.appspot.com/`, "");
  const file = firebase.storage.bucket().file(path);
  await file.delete();
};

const storageService = {
  createFile,
  deleteFile,
};

export default storageService;
