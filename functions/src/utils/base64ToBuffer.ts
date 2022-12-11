export const base64ToBuffer = (image: string): [buffer: Buffer, ext: string] => {
  const base64EncodedImageString = image.replace(/^data:image\/\w+;base64,/, "");
  const imageBuffer = Buffer.from(base64EncodedImageString, "base64");
  const ext = image.substring("data:image/".length, image.indexOf(";base64"));
  return [imageBuffer, ext];
};
