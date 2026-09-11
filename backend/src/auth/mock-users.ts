import { AuthUser, UserRole } from './auth.types';

export const MOCK_USERS: AuthUser[] = [
  {
    id: 'admin-1',
    username: 'admin',
    password: 'admin123',
    role: UserRole.ADMIN,
  },
  {
    id: 'user-1',
    username: 'user',
    password: 'user123',
    role: UserRole.USER,
    rut: '12.345.678-5',
  },
];
