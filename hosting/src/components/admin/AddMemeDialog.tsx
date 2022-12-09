import { useEffect, useState, ChangeEvent } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import CloseDialogButton from "@components/CloseDialogButton";
import { useAddTemplateMutation } from "@stores/api/admin";

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AddMemeDialog = ({ open, handleClose }: Props) => {
  const [file, setFile] = useState<File | null>(null);
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
    await addTemplateRequest({
      title,
      image: await toBase64(file),
    });
  };

  useEffect(() => {
    if (open) {
      setFile(null);
      setFileSrc(null);
      setTitle(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Add meme
        <CloseDialogButton onClick={handleClose} />
      </DialogTitle>
      <DialogContent>
        {error ? <Alert severity="error">{(error as any).data}</Alert> : null}
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload
          <input hidden accept="image/*" type="file" onChange={onFileChange} />
        </Button>
        {fileSrc && (
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
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={save} disabled={isLoading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemeDialog;
