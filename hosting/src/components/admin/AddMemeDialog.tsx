import { useEffect, useState, ChangeEvent } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import CloseDialogButton from "@components/common/CloseDialogButton";
import LoaderButton from "@components/common/LoaderButton";
import { useAddTemplateMutation } from "@stores/api/admin";
import { TEMPLATE_STATUS } from "@shared/models/template";

import fileToBase64 from "@utils/fileToBase64";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AddMemeDialog = ({ open, handleClose }: Props) => {
  const [status, setStatus] = useState<TEMPLATE_STATUS>(
    TEMPLATE_STATUS.PUBLISHED
  );
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
    const res = await addTemplateRequest({
      title,
      status,
      image: await fileToBase64(file),
    });
    if ("data" in res) {
      handleClose();
    }
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
            <Stack>
              <TextField
                fullWidth
                id="template-title"
                margin="dense"
                label="Title"
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e, value) =>
                        setStatus(
                          value
                            ? TEMPLATE_STATUS.PUBLISHED
                            : TEMPLATE_STATUS.UNPUBLISHED
                        )
                      }
                    />
                  }
                  label="Publish"
                />
              </FormGroup>
            </Stack>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <LoaderButton onClick={save} loader={isLoading} disabled={isLoading}>
          Save
        </LoaderButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemeDialog;
