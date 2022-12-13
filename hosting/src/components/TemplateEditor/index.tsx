import { Box } from "@mui/material";
import { TemplateModel, TemplateText } from "@shared/models/template";
import { useEffect, useState, useRef } from "react";
import TextEditor from "./TextEditor";
import { CANVAS_WIDTH } from "src/constants";
import canvasUtils from "@utils/canvas";

interface Props {
  template: TemplateModel | null;
  texts: TemplateText[];
  onChange: (texts: TemplateText[]) => void;
  onTextRefs?: (elements: Element[]) => void;
}

const TemplateEditor = ({ template, texts, onChange, onTextRefs }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [textRefs, setTextRefs] = useState<Element[]>([]);

  useEffect(() => {
    const drawImage = async () => {
      await canvasUtils.drawImageOnCanvas(canvasRef.current, template.url);
      setHeight(canvasRef.current.height);
      setWidth(canvasRef.current.width);
    };

    if (template) {
      onChange([...template.texts]);
      drawImage();
    }
  }, [template]);

  const handleTextChange = (text: TemplateText, index: number) => {
    texts[index] = text;
    onChange([...texts]);
  };

  const setTextEditorRef = (ref: HTMLElement, index: number) => {
    textRefs[index] = ref;
    setTextRefs(textRefs);
    onTextRefs && onTextRefs(textRefs);
  };

  const onDelete = (index: number) => {
    onChange(texts.filter((t, i) => i !== index));
  };

  return (
    <Box position="relative">
      <Box position="relative">
        <canvas
          ref={canvasRef}
          style={{
            width: CANVAS_WIDTH,
            height: "auto",
            boxShadow: "1px 1px 3px #ccc",
          }}
          width={CANVAS_WIDTH * 2}
          height={CANVAS_WIDTH * 2}
        />
        {texts?.map((text, index) => (
          <TextEditor
            innerRef={(el) => setTextEditorRef(el, index)}
            height={height / 2}
            width={width / 2}
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
