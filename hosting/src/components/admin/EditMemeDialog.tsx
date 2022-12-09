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

import CloseDialogButton from "@components/CloseDialogButton";
import LoaderButton from "@components/LoaderButton";
import { useEditTemplateMutation } from "@stores/api/admin";
import { TemplateModel, TEMPLATE_STATUS } from "@shared/models/template";

interface Props {
  open: boolean;
  handleClose: () => void;
  template: TemplateModel | null;
}

const EditMemeDialog = ({ open, template, handleClose }: Props) => {
  const [status, setStatus] = useState<TEMPLATE_STATUS>(
    TEMPLATE_STATUS.PUBLISHED
  );
  const [title, setTitle] = useState("");
  const [editTemplateRequest, { isLoading, error }] = useEditTemplateMutation();

  const save = async () => {
    const res = await editTemplateRequest({
      uid: template.uid,
      status,
      title,
    });
    if ("data" in res) {
      handleClose();
    }
  };

  useEffect(() => {
    if (open && template) {
      setTitle(template.title);
      setStatus(template.status);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Edit meme
        <CloseDialogButton onClick={handleClose} />
      </DialogTitle>
      <DialogContent>
        {error ? <Alert severity="error">{(error as any).data}</Alert> : null}
        {template && (
          <Stack direction="row" gap={2}>
            <img src={template.url} style={{ maxWidth: "512px" }} />
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
                      checked={status === TEMPLATE_STATUS.PUBLISHED}
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
        <LoaderButton onClick={save} loader={isLoading}>
          Save
        </LoaderButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditMemeDialog;
