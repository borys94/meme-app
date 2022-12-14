import { useState } from "react";

import {
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

import { CANVAS_WIDTH } from "@src/constants";
import DeleteMemeDialog from "./DeleteMemeDialog";
import { MemeModel } from "@shared/models/meme";

interface Props {
  meme: MemeModel;
  onDeleted: () => void;
}

const MemePreview = ({ meme, onDeleted }: Props) => {
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  return (
    <Stack
      direction="row"
      justifyContent="center"
      overflow="auto"
      sx={{ py: 2, px: 1 }}
    >
      <img src={meme.url} alt="meme" style={{ width: CANVAS_WIDTH }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DownloadIcon />
            </ListItemIcon>
            <ListItemText primary="Download" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setIsRemoveDialogOpen(true)}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItemButton>
        </ListItem>
      </List>
      <DeleteMemeDialog
        open={isRemoveDialogOpen}
        handleClose={() => setIsRemoveDialogOpen(false)}
        onDeleted={onDeleted}
        meme={meme}
      />
    </Stack>
  );
};

export default MemePreview;
