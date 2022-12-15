import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";

import FavouriteButton from "./FavouriteButton";

interface Props {
  isUploading: boolean;
  hasUploadButton: boolean;
  templateId: string;
  likes: number;
  onUpload: () => void;
  onDownload: () => void;
  onAddText: () => void;
}

export default function ButtonList({
  isUploading,
  hasUploadButton,
  templateId,
  likes,
  onUpload,
  onDownload,
  onAddText,
}: Props) {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={onDownload}>
          <ListItemIcon>
            <DownloadIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Download" />
        </ListItemButton>
      </ListItem>
      {hasUploadButton && (
        <ListItem disablePadding>
          <ListItemButton onClick={onUpload} disabled={isUploading}>
            <ListItemIcon>
              <CloudUploadIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Upload" />
          </ListItemButton>
        </ListItem>
      )}
      <ListItem disablePadding>
        <ListItemButton onClick={onAddText}>
          <ListItemIcon>
            <AddIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Add text" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <FavouriteButton templateId={templateId} likes={likes} />
      </ListItem>
    </List>
  );
}
