import { Module } from '@nestjs/common';
import { MockUserRepository } from './repositories/mock-user.repository';
import { USER_REPOSITORY } from './repositories/user.repository';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: MockUserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class AuthModule {}
