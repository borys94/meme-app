export const deepCopy = (obj: unknown) => {
  return JSON.parse(JSON.stringify(obj));
};
