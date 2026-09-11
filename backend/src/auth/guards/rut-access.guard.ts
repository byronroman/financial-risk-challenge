import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';

import { normalizeRut } from '../../common/utils/rut.util';
import { type JwtPayload, UserRole } from '../auth.types';

type AuthenticatedRequest = Request<{ rut: string }> & {
  user: JwtPayload;
};

@Injectable()
export class RutAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const user = request.user;
    const requestedRut = request.params.rut;

    if (user.role === UserRole.ADMIN) {
      return true;
    }

    if (normalizeRut(user.rut) !== normalizeRut(requestedRut)) {
      throw new ForbiddenException('No tienes permiso para consultar este RUT');
    }

    return true;
  }
}
