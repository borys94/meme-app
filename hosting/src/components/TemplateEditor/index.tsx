import { Box, Stack } from "@mui/material";

import { TemplateModel, TemplateText } from "@shared/models/template";
import { useEffect, useState, useRef } from "react";
import TextEditor from "./TextEditor";
import { CANVAS_WIDTH } from "@src/constants";
import canvasUtils from "@utils/canvas";

interface Props {
  template: TemplateModel | null;
  texts: TemplateText[];
  textRefs: React.MutableRefObject<any[]>;
  onChange: (texts: TemplateText[]) => void;
}

const TemplateEditor = ({ template, texts, textRefs, onChange }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    window.addEventListener("resize", updateScale);
    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  const updateScale = () => {
    const { width } = canvasRef.current.getBoundingClientRect();
    const scale = width / CANVAS_WIDTH;
    setScale(scale);
  };

  useEffect(() => {
    const drawImage = async () => {
      await canvasUtils.drawImageOnCanvas(canvasRef.current, template.url);
      setHeight(canvasRef.current.height);
      setWidth(canvasRef.current.width);
      updateScale();
    };

    if (template) {
      onChange([...template.texts]);
      drawImage();
    }
  }, [template?.id]);

  const handleTextChange = (text: TemplateText, index: number) => {
    texts[index] = text;
    onChange([...texts]);
  };

  const onDelete = (index: number) => {
    onChange(texts.filter((t, i) => i !== index));
  };

  useEffect(() => {
    textRefs.current = textRefs.current.slice(0, texts.length);
  }, [texts]);

  return (
    <Box position="relative">
      <Box position="relative">
        <Stack direction="row">
          <Box
            component="canvas"
            ref={canvasRef}
            width={CANVAS_WIDTH * 2}
            height={CANVAS_WIDTH * 2}
            sx={{
              maxWidth: "100%",
              height: "auto",
              boxShadow: "1px 1px 3px #ccc",
              width: {
                xs: "100%",
                md: CANVAS_WIDTH,
              },
            }}
          />
        </Stack>
        {texts?.map((text, index) => (
          <TextEditor
            innerRef={(el) => (textRefs.current[texts.length - index - 1] = el)}
            height={height / 2}
            width={width / 2}
            scale={scale}
            text={text}
            initialLabel={
              template.texts[index]?.text || (texts && texts[index].text)
            }
            onChange={(text) => handleTextChange(text, index)}
            onDelete={() => onDelete(index)}
            key={template.id + index}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TemplateEditor;
