import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TemplateText } from "@shared/models/template";
import {
  useState,
  useEffect,
  PointerEvent as ReactPointerEvent,
  MouseEvent,
} from "react";

interface ResizeButtonProps {
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}

const DragElements = styled("div")<{ show?: boolean }>(({ show }) => ({
  display: show ? "block" : "none",
}));

const ResizeButton = styled("div")<ResizeButtonProps>(
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

const DragBorder = styled("div")<ResizeButtonProps>(
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

enum DragType {
  Drag = 1,
  TopLeftResize,
  TopRightResize,
  BottomRightResize,
  BottomLeftResize,
}

interface Props {
  text: TemplateText;
  width: number;
  height: number;
  initialLabel: string;
  onChange: (text: TemplateText) => void;
}

export default function Text({
  text,
  width,
  height,
  initialLabel,
  onChange,
}: Props) {
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [offsetX, setOffsetX] = useState<number | null>(null);
  const [offsetY, setOffsetY] = useState<number | null>(null);
  const [dragType, setDragType] = useState<DragType | null>(null);

  const handleTextChange = (e: any) => {
    onChange({
      topLeft: text.topLeft,
      bottomRight: text.bottomRight,
      text: e.target.innerHTML,
    });
  };

  useEffect(() => {
    setLabel(initialLabel || "");
  }, [initialLabel]);

  const onPointerDown = (dragType: DragType) => (e: ReactPointerEvent) => {
    setDragType(dragType);
    setOffsetX(e.pageX);
    setOffsetY(e.pageY);
  };

  useEffect(() => {
    if (offsetX !== null) {
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointermove", onPointerMove);
    } else {
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
    }
  }, [offsetX]);

  const onPointerMove = (e: PointerEvent) => {
    onChange({
      ...text,
      topLeft: {
        ...text.topLeft,
        ...([
          DragType.TopLeftResize,
          DragType.BottomLeftResize,
          DragType.Drag,
        ].includes(dragType)
          ? {
              x: Math.max(
                0,
                Math.min(
                  DragType.Drag === dragType
                    ? width - text.bottomRight.x + text.topLeft.x
                    : text.bottomRight.x,
                  text.topLeft.x + e.pageX - offsetX
                )
              ),
            }
          : {}),
        ...([
          DragType.TopLeftResize,
          DragType.TopRightResize,
          DragType.Drag,
        ].includes(dragType)
          ? {
              y: Math.max(
                0,
                Math.min(
                  DragType.Drag === dragType
                    ? height - text.bottomRight.y + text.topLeft.y
                    : text.bottomRight.y,
                  text.topLeft.y + e.pageY - offsetY
                )
              ),
            }
          : {}),
      },
      bottomRight: {
        ...text.bottomRight,
        ...([
          DragType.TopRightResize,
          DragType.BottomRightResize,
          DragType.Drag,
        ].includes(dragType)
          ? {
              x: Math.max(
                DragType.Drag === dragType
                  ? text.bottomRight.x - text.topLeft.x
                  : text.topLeft.x,
                Math.min(width, text.bottomRight.x + e.pageX - offsetX)
              ),
            }
          : {}),
        ...([
          DragType.BottomLeftResize,
          DragType.BottomRightResize,
          DragType.Drag,
        ].includes(dragType)
          ? {
              y: Math.max(
                DragType.Drag === dragType
                  ? text.bottomRight.y - text.topLeft.y
                  : text.topLeft.y,
                Math.min(height, text.bottomRight.y + e.pageY - offsetY)
              ),
            }
          : {}),
      },
    });
  };

  const onPointerUp = () => {
    setOffsetX(null);
    setOffsetY(null);
    setDragType(null);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointermove", onPointerMove);
  };

  const onBoxClick = (e: MouseEvent) => {
    e.stopPropagation();
    setActive(true);
  };

  const onClickOutside = () => {
    setActive(false);
    window.removeEventListener("click", onClickOutside);
  };

  useEffect(() => {
    if (active) {
      window.addEventListener("click", onClickOutside);

      return () => {
        window.removeEventListener("click", onClickOutside);
      };
    }
  }, [active]);

  return (
    <Box position="absolute" top="0" left="0">
      <div
        onClick={onBoxClick}
        style={{
          position: "absolute",
          border:
            active || !!dragType ? "1px dashed" : "1px dashed transparent",
          left: text.topLeft.x,
          top: text.topLeft.y,
          width: text.bottomRight.x - text.topLeft.x,
          height: text.bottomRight.y - text.topLeft.y,
        }}
      >
        <div
          contentEditable
          onInput={handleTextChange}
          suppressContentEditableWarning={true}
          className="editable-text"
          style={{
            width: text.bottomRight.x - text.topLeft.x,
            height: text.bottomRight.y - text.topLeft.y,
            fontSize: 48,
            fontFamily: "Impact",
            color: "white",
            lineHeight: 1.5,
            marginLeft: 1,
            textShadow:
              "black -1px 0px, black 0px 1px, black 1px 0px, black 0px -1px",
            caretColor: "#4d90fe",
            outline: "0px solid transparent",
          }}
        >
          {label}
        </div>

        <DragElements show={active || !!dragType}>
          <DragBorder top onPointerDown={onPointerDown(DragType.Drag)} />
          <DragBorder bottom onPointerDown={onPointerDown(DragType.Drag)} />
          <DragBorder left onPointerDown={onPointerDown(DragType.Drag)} />
          <DragBorder right onPointerDown={onPointerDown(DragType.Drag)} />
          <ResizeButton
            left
            top
            onPointerDown={onPointerDown(DragType.TopLeftResize)}
          />
          <ResizeButton
            right
            top
            onPointerDown={onPointerDown(DragType.TopRightResize)}
          />
          <ResizeButton
            left
            bottom
            onPointerDown={onPointerDown(DragType.BottomLeftResize)}
          />
          <ResizeButton
            right
            bottom
            onPointerDown={onPointerDown(DragType.BottomRightResize)}
          />
        </DragElements>
      </div>
    </Box>
  );
}
