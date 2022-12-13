import { styled } from "@mui/material/styles";

interface ResizeButtonProps {
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}

export const DragElements = styled("div")<{ show?: boolean }>(({ show }) => ({
  display: show ? "block" : "none",
}));

export const ResizeButton = styled("div")<ResizeButtonProps>(
  ({ left, right, top, bottom, theme }) => ({
    width: 16,
    height: 16,
    borderRadius: 8,
    ...(left ? { left: -16 } : {}),
    ...(right ? { right: -16 } : {}),
    ...(bottom ? { bottom: -16 } : {}),
    ...(top ? { top: -16 } : {}),
    cursor: "pointer",
    position: "absolute",
    backgroundColor: theme.palette.primary.main,
  })
);

const DRAG_BORDER_SIZE = 5;

export const DragBorder = styled("div")<ResizeButtonProps>(
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
