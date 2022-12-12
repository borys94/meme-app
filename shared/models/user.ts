export interface UserModel {
  id?: string;
  email: string;
  createdAt: number;
  role: USER_ROLES;
  avatar: Avatar | null;
}

interface Avatar {
  url: string;
  id: string;
}

export enum USER_ROLES {
  USER = "user",
  ADMIN = "admin"
}
