import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress size={20} />
  </div>
);

type Props = ButtonProps & {
  loader: boolean;
  startIcon?: boolean;
  // variant: ButtonProps["variant"];
};

const LoaderButton = ({
  startIcon = false,
  variant = "contained",
  loader,
  children,
  ...props
}: Props) => (
  <Button {...props} disabled={loader}>
    {loader ? <Loader /> : children}
  </Button>
);

export default LoaderButton;
