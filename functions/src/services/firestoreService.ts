
const getDocsWithID = <T>(snap: FirebaseFirestore.QuerySnapshot): T[] => {
  return snap.docs?.map((d: any) => ({...d.data(), id: d.id})) || [];
};

const getDocWithID = <T>(snap: FirebaseFirestore.DocumentSnapshot<any>): T => ({
  ...snap.data(),
  id: snap.id,
});

const getFirst = <T>(snap: FirebaseFirestore.QuerySnapshot): T => {
  const doc = snap.docs[0];
  return doc && ({id: doc.id, ...doc.data()} as unknown as T);
};

const firestoreService = {
  getDocsWithID,
  getDocWithID,
  getFirst,
};

export default firestoreService;
