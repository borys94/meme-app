import express, {Request, Response} from "express";

import firebase from "../../services/firebaseService";
import {COLLECTIONS} from "../../../../shared/models/collections";

// eslint-disable-next-line
const router = express.Router();

router.post("/templates", async function(req: Request, res: Response) {
  const {image, title} = req.body;

  const base64EncodedImageString = image.replace(/^data:image\/\w+;base64,/, "");
  const imageBuffer = Buffer.from(base64EncodedImageString, "base64");
  const ext = image.substring("data:image/".length, image.indexOf(";base64"));
  const file = firebase.storage.bucket().file(`templates/${title}.${ext}`);
  await file.save(imageBuffer);
  await file.makePublic();
  const url = file.publicUrl();

  await firebase.firestore.collection(COLLECTIONS.TEMPLATES).add({
    title,
    url: url,
    private: true,
  });
  res.status(200).send({
    data: "",
  });
});

export {router as addTemplateRouter};


// export const addTemplate = async (req: Request, res: Response) => {
//   const {fileBase64, title} = req.body;

//   try {
//     const ext = fileBase64.substring("data:image/".length, fileBase64.indexOf(";base64"))
//     const file = firebase.storage.bucket().file(`templates/${title}.${ext}`);
//     // await file.
//     await file.save(fileBase64);
//     await file.makePublic();
//     file.publicUrl();

//     await firebase.firestore.collection(COLLECTIONS.TEMPLATES).add({
//       title,
//       private: true,
//     });
//     res.status(200).send({
//       data: "",
//     });
//   } catch (error) {
//     console.log(error);
//     throw error
//   }

// };
