import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import CloseDialogButton from "@components/common/CloseDialogButton";
import { UserModel, USER_ROLES } from "@shared/models/user";
import { useUpdateUserMutation } from "@stores/api/admin";

interface Props {
  open: boolean;
  handleClose: () => void;
  user: UserModel | null;
}

const EditRecipeDialog = ({ open, user, handleClose }: Props) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<USER_ROLES>(USER_ROLES.USER);
  const [updateUserRequest, { isLoading, error }] = useUpdateUserMutation();

  const editUser = async () => {
    const response = await updateUserRequest({
      id: user.id,
      role,
    });
    if ("data" in response) {
      handleClose();
    }
  };

  useEffect(() => {
    if (open && user) {
      setEmail(user.email);
      setRole(user.role);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Edit User
        <CloseDialogButton onClick={handleClose} />
      </DialogTitle>
      <DialogContent>
        {error ? <Alert severity="error">{(error as any).data}</Alert> : null}
        <FormControl fullWidth>
          <TextField
            fullWidth
            disabled
            margin="dense"
            label="Email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel variant="standard" id="demo-simple-select-label">
            Role
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            variant="standard"
            value={role}
            margin="dense"
            label="Role"
            onChange={(e) => setRole(e.target.value as USER_ROLES)}
          >
            <MenuItem value={USER_ROLES.USER}>{USER_ROLES.USER}</MenuItem>
            <MenuItem value={USER_ROLES.ADMIN}>{USER_ROLES.ADMIN}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={editUser} disabled={isLoading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRecipeDialog;
