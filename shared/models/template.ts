export interface TemplateModel {
  uid: string;
  status: TEMPLATE_STATUS;
  title: string;
  url: string;
  createdAt: number;
  texts: TemplateText[];
}

export interface TemplateText {
  topLeft: {
    x: number;
    y: number;
  };
  bottomRight: {
    x: number;
    y: number;
  };
  text: string;
  styles: TemplateTextStyles;
}

export interface TemplateTextStyles {
  fontFamily: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  color: string;
  shadowColor: string;
  textAlign: string;
}

export enum TEMPLATE_STATUS {
  PUBLISHED = "published",
  UNPUBLISHED = "unpublished"
}