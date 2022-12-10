import { TemplateModel, TemplateText } from "@shared/models/template";
import canvasUtils from "./canvas";

const generateMeme = async (template: TemplateModel, texts: Element[]) => {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = template.url;

  const meme = await new Promise<HTMLCanvasElement>((res) => {
    image.addEventListener("load", (e) => {
      const factor = image.width / 512 / 2;
      canvas.height = image.height / factor;
      canvas.width = image.width / factor;
      ctx.drawImage(image, 0, 0, image.width / factor, image.height / factor);
      res(canvas);
    });
  });

  for (const el of texts) {
    await canvasUtils.drawHTMLElementOnCanvas(canvas, el);
  }

  canvasUtils.download(canvas);
};

export default generateMeme;
