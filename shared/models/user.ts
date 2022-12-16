export interface UserModel {
  id?: string;
  email: string;
  createdAt: number;
  role: USER_ROLES;
  avatar: string | null;
}

export enum USER_ROLES {
  USER = "user",
  ADMIN = "admin"
}
