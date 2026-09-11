import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { AuthModule } from '../auth/auth.module';
import { ScoreController } from './score.controller';

@Module({
  imports: [AuthModule],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
