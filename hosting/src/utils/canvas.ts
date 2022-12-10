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

  canvas.toDataURL();
  const text = element.outerHTML;

  const data =
    "data:image/svg+xml," +
    `<svg xmlns='http://www.w3.org/2000/svg' width='${512}' height='${512}'>` +
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
  });
};

const canvasUtils = {
  download,
  drawHTMLElementOnCanvas,
};

export default canvasUtils;
