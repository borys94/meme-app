import {DocumentReference, FieldValue} from "firebase-admin/firestore";

import firebase from "./firebaseService";
import {COLLECTIONS} from "../../../shared/models/collections";
import {TemplateModel, TEMPLATE_STATUS} from "../../../shared/models/template";
import {MemeModel} from "../../../shared/models/meme";
import {UserModel} from "../../../shared/models/user";


const addTemplate = async (title: string, url: string, status: TEMPLATE_STATUS) => {
  const template: Omit<TemplateModel, "id"> = {
    title,
    url,
    status,
    likes: 0,
    texts: [],
    createdAt: Date.now(),
  };
  return firebase.firestore.collection(COLLECTIONS.TEMPLATES).add(template);
};

const getTemplate = async (templateId: string) => {
  const template = await firebase.firestore.collection(COLLECTIONS.TEMPLATES)
      .doc(templateId) as DocumentReference<TemplateModel>;
  return (await template.get()).data();
};

const updateTemplate = async (id: string, data: Partial<TemplateModel>) => {
  await firebase.firestore.collection(COLLECTIONS.TEMPLATES).doc(id).update({
    ...data,
  });
};

const addFavouriteToUser = async (userId: string, templateId: string) => {
  const [template, data] = await getTemplateRefWithData(templateId);
  await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.FAVOURITES).doc(templateId).set({
        ...data,
      });
  await template.update({
    likes: FieldValue.increment(1),
  });
};

const removeFavouriteFromUser = async (userId: string, templateId: string) => {
  await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.FAVOURITES).doc(templateId).delete();
  await firebase.firestore.collection(COLLECTIONS.TEMPLATES).doc(templateId).update({
    likes: FieldValue.increment(-1),
  });
};

const getUserFavourite = async (userId: string, favouriteId: string) => {
  const favouriteRef = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.FAVOURITES).doc(favouriteId) as DocumentReference<TemplateModel>;
  return getData(favouriteRef);
};

const getUserMeme = async (userId: string, memeId: string) => {
  const memeRef = await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.MEMES).doc(memeId) as DocumentReference<MemeModel>;
  return getData(memeRef);
};

const addMemeToUser = async (userId: string, url: string, title: string) => {
  const meme: MemeModel = {
    title: title,
    createdAt: Date.now(),
    url,
  };
  return firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.MEMES).add({
        ...meme,
      });
};

const removeMemeFromUser = async (userId: string, memeId: string) => {
  return firebase.firestore.collection(COLLECTIONS.USERS).doc(userId)
      .collection(COLLECTIONS.MEMES).doc(memeId).delete();
};

const updateUser = async (userId: string, data: Partial<UserModel>) => {
  await firebase.firestore.collection(COLLECTIONS.USERS).doc(userId).update({
    ...data,
  });
};

const getTemplateRefWithData = async (templateId: string) => {
  const template = await firebase.firestore.collection(COLLECTIONS.TEMPLATES)
      .doc(templateId) as DocumentReference<TemplateModel>;
  return getRefWithData(template);
};

type RefWithData<T> = [ref: DocumentReference<T>, data: T | undefined];
const getRefWithData = async <T>(ref: DocumentReference<T>): Promise<RefWithData<T>> => {
  return [ref, await getData(ref)];
};

const getData = async <T>(ref: DocumentReference<T>) => {
  return (await ref.get()).data();
};

const templateService = {
  addTemplate,
  getTemplate,
  updateTemplate,
  addFavouriteToUser,
  removeFavouriteFromUser,
  getUserFavourite,
  getUserMeme,
  addMemeToUser,
  removeMemeFromUser,
  updateUser,
};

export default templateService;
