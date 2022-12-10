import { Box } from "@mui/material";
import { TemplateModel, TemplateText } from "@shared/models/template";
import { useEffect, useRef } from "react";
import Text from "../TextEditor";

interface Props {
  template: TemplateModel | null;
  texts: TemplateText[];
  onChange: (texts: TemplateText[]) => void;
}

const TemplateEditor = ({ template, texts, onChange }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  // const scale = useMemo(() => window.devicePixelRatio * 2, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = template.url;

    image.addEventListener("load", () => {
      const factor = image.width / 512 / 2;
      canvas.height = image.height / factor;
      ctx.drawImage(image, 0, 0, image.width / factor, image.height / factor);
    });
  }, [template]);

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
      <Box position="relative">
        <canvas
          ref={canvasRef}
          style={{ width: 512, height: "auto", boxShadow: "1px 1px 3px #ccc" }}
          width={512 * 2}
          height={512 * 2}
        />
        {texts?.map((text, index) => (
          <Text
            // height={(canvasRef.current?.height || 0) / 2}
            // width={(canvasRef.current?.width || 0) / 2}
            text={text}
            initialLabel={template.texts[index].text}
            onChange={(text) => handleTextChange(text, index)}
            key={index}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TemplateEditor;
