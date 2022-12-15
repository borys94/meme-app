import { CANVAS_WIDTH } from "@src/constants";

const download = (canvas: HTMLCanvasElement) => {
  const link = document.createElement("a");
  link.download = "filename.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};

const drawHTMLElementOnCanvas = async (
  canvas: HTMLCanvasElement,
  element: Element
) => {
  const ctx = canvas.getContext("2d");
  const text = element.outerHTML.replaceAll("<br>", "<br></br>");

  const data =
    "data:image/svg+xml," +
    `<svg xmlns='http://www.w3.org/2000/svg' width='${canvas.width}' height='${canvas.height}'>` +
    "<foreignObject width='100%' height='100%'>" +
    "<div xmlns='http://www.w3.org/1999/xhtml'>" +
    text +
    "</div>" +
    "</foreignObject>" +
    "</svg>";

  const el = document.createElement("div");
  el.innerHTML = data;

  const img = new Image();
  img.src = data;
  await new Promise<void>((res) => {
    img.onload = function () {
      ctx.setTransform(2, 0, 0, 2, 0, 0);
      ctx.drawImage(
        img,
        +element.parentElement.style.left.replace("px", ""),
        +element.parentElement.style.top.replace("px", "")
      );
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      el.remove();
      res();
    };
    img.onerror = function (e) {
      console.error(e);
    };
  });
};

const drawImageOnCanvas = async (canvas: HTMLCanvasElement, url: string) => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = url;

  await new Promise<HTMLCanvasElement>((res) => {
    image.addEventListener("load", () => {
      const factor = image.width / CANVAS_WIDTH / 2;
      canvas.height = image.height / factor;
      canvas.width = image.width / factor;
      ctx.drawImage(image, 0, 0, image.width / factor, image.height / factor);
      res(canvas);
    });
  });

  return canvas;
};

const canvasUtils = {
  download,
  drawHTMLElementOnCanvas,
  drawImageOnCanvas,
};

export default canvasUtils;
