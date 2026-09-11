import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { formatRut } from '../common/utils/rut.util';
import { ScoreService } from './score.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RutAccessGuard } from '../auth/guards/rut-access.guard';

@UseGuards(JwtAuthGuard, RutAccessGuard)
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get(':rut')
  getScore(@Param('rut') rut: string) {
    const score = this.scoreService.calculateScore(rut);

    return {
      rut: formatRut(rut),
      score,
      fecha: new Date().toISOString(),
    };
  }
}
