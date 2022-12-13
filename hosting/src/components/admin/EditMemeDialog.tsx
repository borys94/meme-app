import { useEffect, useState } from "react";

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
import Box from "@mui/material/Box";

import CloseDialogButton from "@components/common/CloseDialogButton";
import LoaderButton from "@components/common/LoaderButton";
import TemplateEditor from "@components/TemplateEditor";
import { useEditTemplateMutation } from "@stores/api/admin";
import {
  TemplateModel,
  TemplateText,
  TEMPLATE_STATUS,
} from "@shared/models/template";
import { createEmptyText } from "@utils/createEmptyText";

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
  const [texts, setTexts] = useState<TemplateText[]>([]);
  const [editTemplateRequest, { isLoading, error }] = useEditTemplateMutation();

  const save = async () => {
    const res = await editTemplateRequest({
      id: template.id,
      status,
      texts,
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
      setTexts(template.texts || []);
    }
  }, [open]);

  const handleTextChange = (texts: TemplateText[]) => {
    setTexts([...texts]);
  };

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
            <Box position="relative" marginTop={2}>
              <TemplateEditor
                template={template}
                texts={texts}
                onChange={handleTextChange}
              />
            </Box>
            <Stack direction="column" gap={2}>
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
                <Button
                  variant="contained"
                  onClick={() =>
                    setTexts([
                      ...texts,
                      createEmptyText(
                        texts.length ? texts[texts.length - 1] : null
                      ),
                    ])
                  }
                >
                  Add text
                </Button>
              </Stack>
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
