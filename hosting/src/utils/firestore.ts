import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";

const getDocsWithID = <T>(snap: QuerySnapshot<DocumentData>): T[] => {
  return (
    snap.docs?.map((d) => ({ ...d.data(), id: d.id } as unknown as T)) || []
  );
};

const getDocWithID = <T>(snap: DocumentSnapshot<DocumentData>): T =>
  ({
    ...snap.data(),
    id: snap.id,
  } as unknown as T);

const mapToObject = <T>(snap: QuerySnapshot<DocumentData>): Record<string, T> =>
  snap.docs?.reduce(
    (acc, d) => ({ ...acc, [d.id]: { id: d.id, ...d.data() } }),
    {}
  );

const getFirst = <T>(snap: QuerySnapshot<DocumentData>): T => {
  const doc = snap.docs[0];
  return doc && ({ id: doc.id, ...doc.data() } as unknown as T);
};

const firestoreUtils = {
  getDocsWithID,
  getDocWithID,
  mapToObject,
  getFirst,
};

export default firestoreUtils;
