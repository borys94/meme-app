
import firebase from "../services/firebaseService";

export const createPublicFile = async (buffer: Buffer, path: string) => {
  const file = firebase.storage.bucket().file(path);
  await file.save(buffer);
  await file.makePublic();
  return file.publicUrl();
};

