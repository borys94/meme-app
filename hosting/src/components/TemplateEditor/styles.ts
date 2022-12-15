import { styled } from "@mui/material/styles";

interface DragBorderProps {
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}

export const ResizeButton = styled("div")(({ theme }) => ({
  width: "50%",
  height: "50%",
  borderRadius: "50%",
  transform: "translate(-50%, -50%)",
  position: "absolute",
  backgroundColor: theme.palette.primary.main,
}));

const DRAG_BORDER_SIZE = 5;

export const DragBorder = styled("div")<DragBorderProps>(
  ({ left, right, top, bottom }) => ({
    ...(left
      ? {
          height: "100%",
          width: DRAG_BORDER_SIZE,
          left: -DRAG_BORDER_SIZE,
          top: 0,
        }
      : {}),
    ...(right
      ? {
          height: "100%",
          width: DRAG_BORDER_SIZE,
          right: -DRAG_BORDER_SIZE,
          top: 0,
        }
      : {}),
    ...(bottom
      ? {
          height: DRAG_BORDER_SIZE,
          width: "100%",
          bottom: -DRAG_BORDER_SIZE,
        }
      : {}),
    ...(top
      ? {
          height: DRAG_BORDER_SIZE,
          width: "100%",
          top: -DRAG_BORDER_SIZE,
        }
      : {}),
    position: "absolute",
    opacity: "0.5",
    cursor: "grab",
    userSelect: "none",
  })
);
