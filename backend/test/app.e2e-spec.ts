import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'test-secret-for-e2e';
    process.env.JWT_EXPIRES_IN = '3600';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should login a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'user',
        password: 'user123',
      })
      .expect(200);

    expect(response.body.accessToken).toBeDefined();
  });

  it('should reject score access without JWT', async () => {
    await request(app.getHttpServer()).get('/score/12.345.678-5').expect(401);
  });

  it('should allow a user to consult their own RUT', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'user',
        password: 'user123',
      });

    const response = await request(app.getHttpServer())
      .get('/score/12.345.678-5')
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .expect(200);

    expect(response.body.rut).toBe('12.345.678-5');
    expect(response.body.score).toBeGreaterThanOrEqual(0);
    expect(response.body.score).toBeLessThanOrEqual(100);
  });
});
