import { TemplateText } from "@shared/models/template";

const emptyText: TemplateText = {
  topLeft: {
    x: 0,
    y: 0,
  },
  text: "Type here",
  bottomRight: {
    x: 100,
    y: 50,
  },
  styles: {
    fontFamily: "Arial",
    fontSize: 40,
    bold: false,
    italic: false,
    underline: false,
    color: "#000000",
    shadowColor: "#ffffff",
    textAlign: "center",
  },
};

export const createEmptyText = (text?: TemplateText) => {
  if (text) {
    return {
      ...emptyText,
      styles: {
        ...text.styles,
      },
    };
  }
  return emptyText;
};
