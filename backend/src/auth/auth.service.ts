import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from './auth.types';
import {
  USER_REPOSITORY,
  type UserRepository,
} from './repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id,
      role: user.role,
      ...(user.role === UserRole.USER && { rut: user.rut }),
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}