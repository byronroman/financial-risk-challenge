import { BadRequestException } from '@nestjs/common';
import { ScoreService } from '../../src/score/score.service';

describe('ScoreService', () => {
  let service: ScoreService;

  beforeEach(() => {
    service = new ScoreService();
  });

  it('should return the same score for the same RUT', () => {
    const firstScore = service.calculateScore('12.345.678-5');
    const secondScore = service.calculateScore('12.345.678-5');

    expect(firstScore).toBe(secondScore);
  });

  it('should return a score between 0 and 100', () => {
    const score = service.calculateScore('12.345.678-5');

    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('should throw BadRequestException for an invalid RUT', () => {
    expect(() => service.calculateScore('12.345.678-9')).toThrow(
      BadRequestException,
    );
  });
});
