import {
  useState,
  useEffect,
  PointerEvent as ReactPointerEvent,
  FormEvent,
} from "react";
import { Box } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { TemplateText, TemplateTextStyles } from "@shared/models/template";

import Toolbar from "./Toolbar";
import { DragBorder } from "./styles";
import ResizeButton from "./ResizeButton";

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
  scale: number;
  onChange: (text: TemplateText) => void;
  onDelete: () => void;
}

export default function Text({
  innerRef,
  text,
  width,
  height,
  initialLabel,
  scale,
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
    e.stopPropagation();
    e.preventDefault();
    setDragType(dragType);

    setOffsetX(e.pageX);
    setOffsetY(e.pageY);
  };

  useEffect(() => {
    if (offsetX !== null) {
      if (navigator.maxTouchPoints > 0) {
        window.addEventListener("touchend", onPointerUp, { passive: false });
        window.addEventListener("touchmove", onPointerMove, { passive: false });
      } else {
        window.addEventListener("pointerup", onPointerUp, { passive: false });
        window.addEventListener("pointermove", onPointerMove, {
          passive: false,
        });
      }
    } else {
      if (navigator.maxTouchPoints > 0) {
        window.removeEventListener("touchend", onPointerUp);
        window.removeEventListener("touchmove", onPointerMove);
      } else {
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointermove", onPointerMove);
      }
    }
  }, [offsetX]);

  const onPointerMove = (e: PointerEvent | TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let pageX, pageY;
    if (e instanceof TouchEvent) {
      pageX = e.changedTouches[0].pageX;
      pageY = e.changedTouches[0].pageY;
    } else {
      pageX = e.pageX;
      pageY = e.pageY;
    }

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
                  text.topLeft.x + (pageX - offsetX) / scale
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
                  text.topLeft.y + (pageY - offsetY) / scale
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
                Math.min(width, text.bottomRight.x + (pageX - offsetX) / scale)
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
                Math.min(height, text.bottomRight.y + (pageY - offsetY) / scale)
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

    window.removeEventListener("touchmove", onPointerMove);
    window.removeEventListener("touchend", onPointerUp);
  };

  const onBoxClick = () => {
    setActive(true);
  };

  const onClickOutside = () => {
    setActive(false);
    window.removeEventListener("mousedown", onClickOutside);
  };

  const handleToolbarChange = (styles: TemplateTextStyles) => {
    onChange({
      ...text,
      styles,
    });
  };

  const { shadowColor } = text.styles;

  return (
    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={onClickOutside}>
      <Box
        position="absolute"
        top="0"
        left="0"
        sx={{
          zIndex: active ? 10 : 0,
        }}
      >
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {(active || !!dragType) && (
            <Toolbar
              fixed
              onChange={handleToolbarChange}
              onDelete={onDelete}
              {...text.styles}
            />
          )}
        </Box>
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <div
            onMouseDown={onBoxClick}
            style={{
              position: "absolute",
              border: active ? "1px dashed" : "1px dashed transparent",
              left: text.topLeft.x,
              top: text.topLeft.y,
              width: text.bottomRight.x - text.topLeft.x,
              height: text.bottomRight.y - text.topLeft.y,
            }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {(active || !!dragType) && (
                <Toolbar
                  scale={1 / scale}
                  onChange={handleToolbarChange}
                  onDelete={onDelete}
                  {...text.styles}
                />
              )}
            </Box>
            <div
              ref={innerRef}
              contentEditable
              onInput={handleTextChange}
              suppressContentEditableWarning={true}
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
                userSelect: "none",
              }}
            >
              {label}
            </div>
            {active && (
              <Box>
                <DragBorder top onPointerDown={onPointerDown(DragType.Drag)} />
                <DragBorder
                  bottom
                  onPointerDown={onPointerDown(DragType.Drag)}
                />
                <DragBorder left onPointerDown={onPointerDown(DragType.Drag)} />
                <DragBorder
                  right
                  onPointerDown={onPointerDown(DragType.Drag)}
                />
                <ResizeButton
                  left
                  top
                  scale={scale}
                  onPointerDown={onPointerDown(DragType.TopLeftResize)}
                />
                <ResizeButton
                  right
                  top
                  scale={scale}
                  onPointerDown={onPointerDown(DragType.TopRightResize)}
                />
                <ResizeButton
                  left
                  bottom
                  scale={scale}
                  onPointerDown={onPointerDown(DragType.BottomLeftResize)}
                />
                <ResizeButton
                  right
                  bottom
                  scale={scale}
                  onPointerDown={onPointerDown(DragType.BottomRightResize)}
                />
              </Box>
            )}
          </div>
        </div>
      </Box>
    </ClickAwayListener>
  );
}
