import { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import TableRow from "@mui/material/TableRow";

import {
  getFirestore,
  collection,
  CollectionReference,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firebase } from "../../FirebaseConfig";
import { COLLECTIONS } from "@shared/models/collections";
import { UserModel } from "@shared/models/user";

import { useAddTemplateMutation } from "@stores/api/admin";

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function UsersTable() {
  const [file, setFile] = useState<File | null>(null);
  const [buffer, setBuffer] = useState<Buffer | null>(null);
  const [fileSrc, setFileSrc] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [addTemplateRequest, { isLoading, error }] = useAddTemplateMutation();

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    if (file) {
      const src = URL.createObjectURL(file);
      setFileSrc(src);
      setFile(file);
    }
  };

  const save = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    await addTemplateRequest({
      title,
      image: await toBase64(file),
    });
  };

  return (
    <Box>
      <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" type="file" onChange={onFileChange} />
      </Button>
      <Stack direction="row" gap={2}>
        {fileSrc && <img src={fileSrc} style={{ maxWidth: "512px" }} />}
        <TextField
          fullWidth
          id="template-title"
          margin="dense"
          label="Title"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button variant="contained" onClick={save} disabled={isLoading}>
          Save
        </Button>
      </Stack>
    </Box>
  );
}
