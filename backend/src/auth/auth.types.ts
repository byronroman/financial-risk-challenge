export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

interface BaseAuthUser {
  id: string;
  username: string;
  password: string;
}

export interface AdminUser extends BaseAuthUser {
  role: UserRole.ADMIN;
}

export interface RegularUser extends BaseAuthUser {
  role: UserRole.USER;
  rut: string;
}

export type AuthUser = AdminUser | RegularUser;
