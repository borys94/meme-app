
import firebase from "../services/firebaseService";

export const deletePublicFile = async (path: string) => {
  const file = firebase.storage.bucket().file(path);
  await file.delete();
};

export const deletePublicFileByUrl = async (url: string) => {
  url = decodeURIComponent(url);
  const path = url.replace(`https://storage.googleapis.com/${process.env.GCLOUD_PROJECT}.appspot.com/`, "");

  const file = firebase.storage.bucket().file(path);
  await file.delete();
};
