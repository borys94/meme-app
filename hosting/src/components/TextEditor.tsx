import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TemplateText } from "@shared/models/template";
import { useState, useEffect, DragEvent } from "react";

import PanToolIcon from "@mui/icons-material/PanTool";

interface ResizeButtonProps {
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}

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

interface Props {
  text: TemplateText;
  initialLabel: string;
  onChange: (text: TemplateText) => void;
}

export default function Text({ text, initialLabel, onChange }: Props) {
  const [ghostElement, setGhostElement] = useState<HTMLElement | null>(null);
  const [label, setLabel] = useState("");

  const onDragStart = (e: DragEvent) => {
    const div = document.createElement("div");
    div.style.width = "1px";
    div.style.height = "1px";
    div.style.backgroundColor = "transparent";
    document.body.appendChild(div);
    setGhostElement(div);
    e.dataTransfer.setDragImage(div, 0, 0);
  };

  const onDragEnd = () => {
    if (ghostElement) {
      ghostElement.remove();
    }
  };

  const onDrag = (e: DragEvent) => {
    e.preventDefault();
    if (e.nativeEvent.pageX === 0 && e.nativeEvent.pageY === 0) {
      return;
    }
    onChange({
      ...text,
      topLeft: {
        x: text.topLeft.x + e.nativeEvent.offsetX,
        y: text.topLeft.y + e.nativeEvent.offsetY,
      },
      bottomRight: {
        x: text.bottomRight.x + e.nativeEvent.offsetX,
        y: text.bottomRight.y + e.nativeEvent.offsetY,
      },
    });
  };

  const onTopLeftDrag = (e: DragEvent) => {
    e.preventDefault();
    if (e.nativeEvent.pageX === 0 && e.nativeEvent.pageY === 0) {
      return;
    }

    onChange({
      ...text,
      topLeft: {
        x: text.topLeft.x + e.nativeEvent.offsetX,
        y: text.topLeft.y + e.nativeEvent.offsetY,
      },
    });
  };

  const onBottomRightDrag = (e: DragEvent) => {
    e.preventDefault();
    if (e.nativeEvent.pageX === 0 && e.nativeEvent.pageY === 0) {
      return;
    }

    onChange({
      ...text,
      bottomRight: {
        x: text.bottomRight.x + e.nativeEvent.offsetX,
        y: text.bottomRight.y + e.nativeEvent.offsetY,
      },
    });
  };

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

  return (
    <Box position="absolute" top="0" left="0">
      <div
        style={{
          position: "absolute",
          border: "1px dashed",
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
          }}
        >
          {label}
        </div>

        <Box
          onDrag={onDrag}
          onDragStart={onDragStart}
          sx={{
            cursor: "pointer",
            width: 32,
            height: 32,
            position: "absolute",
            right: -36,
            top: 0,
            bottom: 0,
            margin: "auto",
          }}
          draggable
        >
          <PanToolIcon />
        </Box>
        <ResizeButton
          left
          top
          onDrag={onTopLeftDrag}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          draggable
        />
        <ResizeButton right top />
        <ResizeButton left bottom />
        <ResizeButton
          right
          bottom
          onDrag={onBottomRightDrag}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          draggable
        />
      </div>
    </Box>
  );
}
