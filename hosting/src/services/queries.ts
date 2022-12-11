import {
  collection,
  query,
  FirestoreError,
  where,
  doc,
} from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

import { firestore } from "../FirebaseConfig";
import { COLLECTIONS } from "@shared/models/collections";
import { TEMPLATE_STATUS } from "@shared/models/template";

enum QUERIES {
  GET_USERS = "getUsers",
  GET_TEMPLATES = "getTemplates",
  GET_FAVOURITES = "getFavourites",

  GET_USER = "getUser",
}

const useQuery = <T = unknown>(
  q: QUERIES,
  params?: any
): [data: T[], loading: boolean, error: FirestoreError] => {
  const [data, loading, error] = useCollection<T>(firebaseQueries[q](params));
  const dataWithIds = data?.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));

  return [dataWithIds || [], loading, error];
};

const useQueryDocument = <T = unknown>(
  q: QUERIES,
  params?: any
): [data: T, loading: boolean, error: FirestoreError] => {
  const [value, loading, error] = useDocument<T>(firebaseQueries[q](params));
  const dataWithId = value
    ? {
        ...value.data(),
        uid: value.id,
      }
    : null;

  return [dataWithId, loading, error];
};

const getUser = ({ userId }: { userId: string }) => {
  if (!userId) {
    return null;
  }
  return doc(firestore, COLLECTIONS.USERS, userId);
};

const getUsers = () => {
  return query(collection(firestore, COLLECTIONS.USERS));
};

const getTemplates = ({ status }: { status?: TEMPLATE_STATUS }) => {
  const constraints = [];
  if (status) {
    constraints.push(where("status", "==", status));
  }
  return query(collection(firestore, COLLECTIONS.TEMPLATES), ...constraints);
};

const getFavourites = ({ userId }: { userId: string }) => {
  if (!userId) {
    return null;
  }
  return query(
    collection(firestore, COLLECTIONS.USERS, userId, COLLECTIONS.FAVOURITES)
  );
};

const firebaseQueries: Record<QUERIES, (params?: any) => any> = {
  [QUERIES.GET_USERS]: getUsers,
  [QUERIES.GET_TEMPLATES]: getTemplates,
  [QUERIES.GET_FAVOURITES]: getFavourites,
  [QUERIES.GET_USER]: getUser,
};

export {
  QUERIES,
  useQuery as useCollectionData,
  useQueryDocument as useDocument,
};
