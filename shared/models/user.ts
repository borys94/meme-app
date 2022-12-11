export interface UserModel {
  uid: string;
  email: string;
  createdAt: number;
  role: USER_ROLES;
  avatarUrl: string;
  avatarId: string;
}

export enum USER_ROLES {
  USER = "user",
  ADMIN = "admin"
}
