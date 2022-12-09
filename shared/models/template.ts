export interface TemplateModel {
  uid: string;
  status: TEMPLATE_STATUS;
  title: string;
  url: string;
  createdAt: number;
}

export enum TEMPLATE_STATUS {
  PUBLISHED = "published",
  UNPUBLISHED = "unpublished"
}