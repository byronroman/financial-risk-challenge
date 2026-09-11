import { Injectable } from '@nestjs/common';

import { AuthUser } from '../auth.types';
import { MOCK_USERS } from '../mock-users';
import { UserRepository } from './user.repository';

@Injectable()
export class MockUserRepository implements UserRepository {
  async findByUsername(username: string): Promise<AuthUser | null> {
    return MOCK_USERS.find((user) => user.username === username) ?? null;
  }
}
