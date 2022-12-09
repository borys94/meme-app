import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  onClick: () => void;
}

const CloseDialogButton = ({ onClick, ...rest }: Props) => (
  <IconButton
    aria-label="close"
    onClick={onClick}
    sx={{
      position: "absolute",
      right: 8,
      top: 8,
    }}
    {...rest}
  >
    <CloseIcon />
  </IconButton>
);

export default CloseDialogButton;
