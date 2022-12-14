import { useContext } from "react";

import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Alert,
  DialogTitle,
} from "@mui/material";

import CloseDialogButton from "@components/common/CloseDialogButton";
import LoaderButton from "@components/common/LoaderButton";
import { AppContext } from "@components/AppContextProvider";

import { MemeModel } from "@shared/models/meme";
import { useRemoveMemeMutation } from "@stores/api/admin";

interface Props {
  open: boolean;
  handleClose: () => void;
  onDeleted: () => void;
  meme: MemeModel | null;
}

const DeleteMemeDialog = ({ open, meme, handleClose, onDeleted }: Props) => {
  const [removeMemeRequest, { isLoading, error }] = useRemoveMemeMutation();
  const { user } = useContext(AppContext);

  const editUser = async () => {
    const response = await removeMemeRequest({
      userId: user.id,
      memeId: meme.id,
    });
    if ("data" in response) {
      onDeleted();
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Deleting meme
        <CloseDialogButton onClick={handleClose} />
      </DialogTitle>
      <DialogContent>
        {error ? <Alert severity="error">{(error as any).data}</Alert> : null}
        <Typography>Are you sure?</Typography>
      </DialogContent>
      <DialogActions>
        <LoaderButton color="error" onClick={editUser} loader={isLoading}>
          Delete
        </LoaderButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMemeDialog;
