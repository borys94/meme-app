import {
  useState,
  useEffect,
  PointerEvent as ReactPointerEvent,
  MouseEvent,
  FormEvent,
} from "react";
import { Box } from "@mui/material";

import { TemplateText, TemplateTextStyles } from "@shared/models/template";

import Toolbar from "./Toolbar";
import { DragElements, ResizeButton, DragBorder } from "./styles";

enum DragType {
  Drag = 1,
  TopLeftResize,
  TopRightResize,
  BottomRightResize,
  BottomLeftResize,
}

interface Props {
  innerRef: (el: HTMLElement) => void;
  text: TemplateText;
  width: number;
  height: number;
  initialLabel: string;
  id: string;
  onChange: (text: TemplateText) => void;
  onDelete: () => void;
}

export default function Text({
  innerRef,
  text,
  width,
  height,
  initialLabel,
  id,
  onChange,
  onDelete,
}: Props) {
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [offsetX, setOffsetX] = useState<number | null>(null);
  const [offsetY, setOffsetY] = useState<number | null>(null);
  const [dragType, setDragType] = useState<DragType | null>(null);

  const handleTextChange = (e: FormEvent<HTMLDivElement>) => {
    onChange({
      ...text,
      // eslint-disable-next-line
      text: (e.target as any).innerHTML,
    });
  };

  useEffect(() => {
    setLabel(initialLabel || "");
  }, []);

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
    window.removeEventListener("mousedown", onClickOutside);
  };

  useEffect(() => {
    if (active) {
      window.addEventListener("mousedown", onClickOutside);

      return () => {
        window.removeEventListener("mousedown", onClickOutside);
      };
    }
  }, [active]);

  const handleToolbarChange = (styles: TemplateTextStyles) => {
    onChange({
      ...text,
      styles,
    });
  };

  const { shadowColor } = text.styles;

  return (
    <Box position="absolute" top="0" left="0">
      <div
        onMouseDown={onBoxClick}
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
        {(active || !!dragType) && (
          <Toolbar
            onChange={handleToolbarChange}
            onDelete={onDelete}
            {...text.styles}
          />
        )}
        <div
          ref={innerRef}
          contentEditable
          onInput={handleTextChange}
          suppressContentEditableWarning={true}
          className="editable-text"
          id={id}
          style={{
            width: text.bottomRight.x - text.topLeft.x,
            height: text.bottomRight.y - text.topLeft.y,
            fontSize: text.styles.fontSize,
            fontFamily: text.styles.fontFamily,
            textDecoration: text.styles.underline ? "underline" : "none",
            fontWeight: text.styles.bold ? "bold" : "normal",
            fontStyle: text.styles.italic ? "italic" : "normal",
            color: text.styles.color,
            textAlign: text.styles.textAlign,
            lineHeight: 1.5,
            marginLeft: 1,
            textShadow: `${shadowColor} -1px 0px, ${shadowColor} 0px 1px, ${shadowColor} 1px 0px, ${shadowColor} 0px -1px`,
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
