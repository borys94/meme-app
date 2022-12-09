import { collection, query, FirestoreError } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { firestore } from "../FirebaseConfig";
import { COLLECTIONS } from "@shared/models/collections";

enum QUERIES {
  GET_USERS = "getUsers",
  GET_TEMPLATES = "getTemplates",
}

const useQuery = <T = unknown>(
  q: QUERIES
): [data: T[], loading: boolean, error: FirestoreError] => {
  const [data, loading, error] = useCollection<T>(firebaseQueries[q]());
  const dataWithIds = data?.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));

  return [dataWithIds, loading, error];
};

const getUsers = () => {
  return query(collection(firestore, COLLECTIONS.USERS));
};

const getTemplates = () => {
  return query(collection(firestore, COLLECTIONS.TEMPLATES));
};

const firebaseQueries: Record<QUERIES, () => any> = {
  [QUERIES.GET_USERS]: getUsers,
  [QUERIES.GET_TEMPLATES]: getTemplates,
};

export { QUERIES, useQuery as useCollectionData };
