import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import WarningIcon from "@mui/icons-material/Warning";

import { TemplateModel } from "@shared/models/template";
import { useCollectionData, QUERIES } from "@services/queries";

import AddMemeDialog from "./AddMemeDialog";

export default function TemplatesTable() {
  const [isAddMemeDialogOpen, setIsAddMemeDialogOpen] = useState(false);
  const [templates] = useCollectionData<TemplateModel>(QUERIES.GET_TEMPLATES);

  return (
    <Box>
      <Button variant="contained" onClick={() => setIsAddMemeDialogOpen(true)}>
        Add new meme
      </Button>
      <Stack direction="row" marginTop={3} gap={2}>
        {templates?.map((template) => (
          <Box position="relative" key={template.uid}>
            <img src={template.url} width={128} />
            {template.private && (
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
    </Box>
  );
}
