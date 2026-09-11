import { Injectable, BadRequestException } from '@nestjs/common';
import { isValidRut, normalizeRut } from '../common/utils/rut.util';
import { createHash } from 'node:crypto';

@Injectable()
export class ScoreService {
  calculateScore(rut: string): number {
    if (!isValidRut(rut)) {
      throw new BadRequestException('RUT inválido');
    }

    const normalizedRut = normalizeRut(rut);

    const hash = createHash('sha256').update(normalizedRut).digest('hex');

    const numericValue = parseInt(hash.slice(0, 8), 16);

    return numericValue % 101;
  }
}
