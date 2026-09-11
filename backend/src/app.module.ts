import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, ScoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
