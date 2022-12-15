import { Box } from "@mui/material";

import { ResizeButton as Button } from "./styles";

export interface Props {
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  scale: number;
  onPointerDown: (e: React.PointerEvent) => void;
}

const ResizeButton = ({
  left,
  right,
  bottom,
  top,
  scale,
  onPointerDown,
}: Props) => (
  <Box
    onPointerDown={onPointerDown}
    padding={2}
    sx={{
      ...(left ? { left: -16 } : {}),
      ...(right ? { right: -16 } : {}),
      ...(bottom ? { bottom: -16 } : {}),
      ...(top ? { top: -16 } : {}),
      width: 16 / scale,
      height: 16 / scale,
      position: "absolute",
      cursor: "pointer",
      zIndex: 10,
    }}
  >
    <Button />
  </Box>
);

export default ResizeButton;
