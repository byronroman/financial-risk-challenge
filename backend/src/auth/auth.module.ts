import { Module } from '@nestjs/common';
import { MockUserRepository } from './repositories/mock-user.repository';
import { USER_REPOSITORY } from './repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: Number(configService.getOrThrow<string>('JWT_EXPIRES_IN')),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: USER_REPOSITORY,
      useClass: MockUserRepository,
    },
  ],
  exports: [USER_REPOSITORY, JwtModule],
})
export class AuthModule {}
