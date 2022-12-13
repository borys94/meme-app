import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  getDoc,
  doc,
  getDocs,
  setDoc,
  collection,
  setLogLevel,
  query,
  where,
} from "firebase/firestore";
import fs from "fs";

import { COLLECTIONS } from "../../shared/models/collections";

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  // Silence expected rules rejections from Firestore SDK. Unexpected rejections
  // will still bubble up and will be thrown as an error (failing the tests).
  setLogLevel("error");

  testEnv = await initializeTestEnvironment({
    projectId: "meme-app",
    firestore: {
      port: 8080,
      host: "localhost",
      rules: fs.readFileSync("../firestore.rules", "utf8"),
    },
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

it("success when get myself", async () => {
  const userId = "userId";
  const user = testEnv.authenticatedContext(userId);

  await assertSucceeds(
    getDoc(doc(user.firestore(), COLLECTIONS.USERS, userId))
  );
});

it("fails when get other user", async () => {
  const userId = "userId";
  const user = testEnv.authenticatedContext(userId);

  await assertFails(getDoc(doc(user.firestore(), COLLECTIONS.USERS, "other")));
});

it("fails when tries to edit myself", async () => {
  const userId = "userId";
  const user = testEnv.authenticatedContext(userId);

  await assertFails(setDoc(doc(user.firestore(), COLLECTIONS.USERS, "id"), {}));
});

it("success when admin get a user", async () => {
  const userId = "userId";
  const user = testEnv.authenticatedContext(userId, {
    role: "admin",
  });

  await assertSucceeds(
    getDoc(doc(user.firestore(), COLLECTIONS.USERS, userId))
  );
});

// -------

it("success when get favourites", async () => {
  const userId = "userId";
  const user = testEnv.authenticatedContext(userId);

  await assertSucceeds(
    getDocs(
      query(
        collection(
          user.firestore(),
          COLLECTIONS.USERS,
          userId,
          COLLECTIONS.FAVOURITES
        )
      )
    )
  );
});

it("fail when a user gets the other user's favorite templates", async () => {
  const user = testEnv.authenticatedContext("userId");

  await assertFails(
    getDocs(
      query(
        collection(
          user.firestore(),
          COLLECTIONS.USERS,
          "other",
          COLLECTIONS.FAVOURITES
        )
      )
    )
  );
});

it("success when the admin gets the other user's favorite templates", async () => {
  const admin = testEnv.authenticatedContext("admin", {
    role: "admin",
  });

  await assertSucceeds(
    getDocs(
      query(
        collection(
          admin.firestore(),
          COLLECTIONS.USERS,
          "other",
          COLLECTIONS.FAVOURITES
        )
      )
    )
  );
});

// -------------

it("success when get published templates", async () => {
  const userId = "userId";
  const user = testEnv.authenticatedContext(userId);

  await assertSucceeds(
    getDocs(
      query(
        collection(user.firestore(), COLLECTIONS.TEMPLATES),
        where("status", "==", "published")
      )
    )
  );
});

it("fails when get unpublished templates", async () => {
  const userId = "userId";
  const user = testEnv.authenticatedContext(userId);

  await assertFails(
    getDocs(
      query(
        collection(user.firestore(), COLLECTIONS.TEMPLATES),
        where("status", "==", "unpublished")
      )
    )
  );
});

it("fails when get all templates", async () => {
  const userId = "userId";
  const user = testEnv.authenticatedContext(userId);

  await assertFails(
    getDocs(query(collection(user.firestore(), COLLECTIONS.TEMPLATES)))
  );
});

it("success when admin get all templates", async () => {
  const admin = testEnv.authenticatedContext("admin", { role: "admin" });

  await assertSucceeds(
    getDocs(
      query(
        collection(admin.firestore(), COLLECTIONS.TEMPLATES),
        where("status", "==", "published")
      )
    )
  );
});
