
import firebase from "../services/firebaseService";

export const deletePublicFile = async (path: string) => {
  try {
    const file = firebase.storage.bucket().file(path);
    await file.delete();
  } catch (e) {
    console.error(e);
  }
};

