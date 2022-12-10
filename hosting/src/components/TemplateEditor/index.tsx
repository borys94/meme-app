import { Box, Button } from "@mui/material";
import { TemplateModel, TemplateText } from "@shared/models/template";
import { useEffect, useState, useRef, useMemo } from "react";
import Toolbar from "./Toolbar";
import Text from "../TextEditor";

import canvasUtils from "@utils/canvas";
import generateMeme from "@utils/generateMeme";

interface Props {
  template: TemplateModel | null;
  texts: TemplateText[];
  onChange: (texts: TemplateText[]) => void;
}

const TemplateEditor = ({ template, texts, onChange }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const scale = useMemo(() => window.devicePixelRatio * 2, []);
  // const [texts, setTexts] = useState<TemplateText[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = template.url;

    image.addEventListener("load", (e) => {
      const factor = image.width / 512 / 2;
      canvas.height = image.height / factor;
      ctx.drawImage(image, 0, 0, image.width / factor, image.height / factor);
    });
  }, [template]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.imageSmoothingEnabled = false;
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (template) {
      onChange([...template.texts]);
    }
  }, [template]);

  const handleTextChange = (text: TemplateText, index: number) => {
    texts[index] = text;
    onChange([...texts]);
  };

  return (
    <Box position="relative">
      {/* <Toolbar /> */}
      <Box position="relative">
        <canvas
          ref={canvasRef}
          style={{ width: 512, height: "auto", boxShadow: "1px 1px 3px #ccc" }}
          width={512 * 2}
          height={512 * 2}
        />
        {canvasRef.current &&
          texts?.map((text, index) => (
            <Text
              template={template}
              height={canvasRef.current.height / 2}
              width={canvasRef.current.width / 2}
              text={text}
              onChange={(text) => handleTextChange(text, index)}
              key={index}
            />
          ))}
      </Box>
    </Box>
  );
};

export default TemplateEditor;
