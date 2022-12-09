import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import WarningIcon from "@mui/icons-material/Warning";

import { TemplateModel, TEMPLATE_STATUS } from "@shared/models/template";
import { useCollectionData, QUERIES } from "@services/queries";

import AddMemeDialog from "./AddMemeDialog";
import EditMemeDialog from "./EditMemeDialog";

export default function TemplatesTable() {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateModel | null>(
    null
  );
  const [isAddMemeDialogOpen, setIsAddMemeDialogOpen] = useState(false);
  const [isEditMemeDialogOpen, setIsEditMemeDialogOpen] = useState(false);
  const [status, setStatus] = useState<TEMPLATE_STATUS | "">("");
  const [templates] = useCollectionData<TemplateModel>(QUERIES.GET_TEMPLATES, {
    ...(status ? { status } : {}),
  });

  const openEditTemplateModal = (template: TemplateModel) => {
    setIsEditMemeDialogOpen(true);
    setCurrentTemplate(template);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <FormControl sx={{ width: 150 }}>
          <InputLabel variant="standard" id="demo-simple-select-label">
            Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            value={status}
            margin="dense"
            label="Status"
            onChange={(e) => setStatus(e.target.value as TEMPLATE_STATUS)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={TEMPLATE_STATUS.PUBLISHED}>
              {TEMPLATE_STATUS.PUBLISHED}
            </MenuItem>
            <MenuItem value={TEMPLATE_STATUS.UNPUBLISHED}>
              {TEMPLATE_STATUS.UNPUBLISHED}
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={() => setIsAddMemeDialogOpen(true)}
        >
          Add new meme
        </Button>
      </Stack>

      <Stack direction="row" marginTop={3} gap={2}>
        {templates?.map((template) => (
          <Box
            position="relative"
            key={template.uid}
            onClick={() => openEditTemplateModal(template)}
          >
            <img src={template.url} width={128} />
            {template.status === TEMPLATE_STATUS.UNPUBLISHED && (
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="center"
              >
                <WarningIcon color="warning" />
                <Typography>Unpublished</Typography>
              </Stack>
            )}
          </Box>
        ))}
      </Stack>
      <AddMemeDialog
        open={isAddMemeDialogOpen}
        handleClose={() => setIsAddMemeDialogOpen(false)}
      />
      <EditMemeDialog
        open={isEditMemeDialogOpen}
        handleClose={() => setIsEditMemeDialogOpen(false)}
        template={currentTemplate}
      />
    </Box>
  );
}
