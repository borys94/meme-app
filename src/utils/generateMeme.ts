import { TemplateModel } from "@shared/models/template";
import canvasUtils from "./canvas";

const generateMeme = async (template: TemplateModel, texts: Element[]) => {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  await canvasUtils.drawImageOnCanvas(canvas, template.url);
  for (const el of texts) {
    await canvasUtils.drawHTMLElementOnCanvas(canvas, el);
  }

  return canvas;
};

export default generateMeme;
