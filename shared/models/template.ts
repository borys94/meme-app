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
  text: string
}

export enum TEMPLATE_STATUS {
  PUBLISHED = "published",
  UNPUBLISHED = "unpublished"
}