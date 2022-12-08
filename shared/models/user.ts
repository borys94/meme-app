export interface UserModel {
  uid: string;
  email: string;
  createdAt: string;
  role: USER_ROLES;
}

export enum USER_ROLES {
  USER = "user",
  ADMIN = "admin"
}
