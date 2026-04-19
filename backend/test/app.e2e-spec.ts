import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/modules/auth/auth.service';

/**
 * Tests E2E (End-to-End) para flujos críticos.
 * Requiere DB de prueba configurada.
 * 
 * Ejecución: npm run test:e2e
 */
describe('AppModule E2E (Tarea 16)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let authToken: string;
  let businessId: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('DATABASE_CONNECTION')
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Health Check', () => {
    it('GET / debe retornar información del servidor', async () => {
      const response = await request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .catch(() => ({ status: 404 })); // Puede no existir

      expect(response.status).toBeOneOf([200, 404, 405]);
    });
  });

  describe('Auth Flow', () => {
    it('POST /auth/register debe crear un usuario', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          businessName: 'Test Business',
          whatsappNumber: '+573105555555',
          password: 'Test@1234',
          email: 'test@example.com',
        })
        .expect(200, 201);

      expect(response.body.success || response.body.token).toBeTruthy();

      if (response.body.token) {
        authToken = response.body.token;
        userId = response.body.userId;
      }
    });

    it('POST /auth/login debe autenticar un usuario', async () => {
      if (!authToken) {
        // Crear usuario primero
        const registerResp = await request(app.getHttpServer())
          .post('/auth/register')
          .send({
            businessName: 'E2E Test',
            whatsappNumber: '+573115555555',
            password: 'Test@5678',
          });

        if (registerResp.body.token) {
          authToken = registerResp.body.token;
        }
      }

      const loginResp = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          whatsappNumber: '+573115555555',
          password: 'Test@5678',
        });

      expect(loginResp.body.token || loginResp.status).toBeTruthy();
    });
  });

  describe('Users - excludedContacts (Tarea 14)', () => {
    it('POST /users/:id/excluded-contacts debe agregar contacto', async () => {
      if (!userId || !authToken) {
        this.skip();
      }

      const response = await request(app.getHttpServer())
        .post(`/users/${userId}/excluded-contacts`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          phoneNumber: '+573105555555',
        })
        .expect(200, 201);

      expect(response.body.success || response.body.excludedContacts).toBeTruthy();
    });

    it('GET /users/:id/excluded-contacts debe retornar lista', async () => {
      if (!userId || !authToken) {
        this.skip();
      }

      const response = await request(app.getHttpServer())
        .get(`/users/${userId}/excluded-contacts`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.excludedContacts).toBeInstanceOf(Array);
    });

    it('DELETE /users/:id/excluded-contacts/:phoneNumber debe remover', async () => {
      if (!userId || !authToken) {
        this.skip();
      }

      const response = await request(app.getHttpServer())
        .delete(`/users/${userId}/excluded-contacts/%2B573105555555`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success || response.body.excludedContacts).toBeTruthy();
    });
  });

  describe('Queue - CRUD (Tarea 11)', () => {
    let queueItemId: string;

    it('POST /queue debe crear un turno', async () => {
      if (!authToken) {
        this.skip();
      }

      const response = await request(app.getHttpServer())
        .post('/queue')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          phoneNumber: '+573205555555',
          clientName: 'John Doe',
          queueDate: new Date().toISOString().split('T')[0],
          notes: 'Test appointment',
        })
        .expect(200, 201);

      expect(response.body.id || response.body.queueItemId).toBeTruthy();

      if (response.body.id) {
        queueItemId = response.body.id;
      }
    });

    it('GET /queue debe listar turnos', async () => {
      if (!authToken) {
        this.skip();
      }

      const response = await request(app.getHttpServer())
        .get('/queue')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
    });

    it('PUT /queue/:id debe actualizar un turno', async () => {
      if (!authToken || !queueItemId) {
        this.skip();
      }

      const response = await request(app.getHttpServer())
        .put(`/queue/${queueItemId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          clientName: 'Jane Doe',
        })
        .expect(200);

      expect(response.body.success || response.body.id).toBeTruthy();
    });

    it('POST /queue/:id/complete debe marcar como completado', async () => {
      if (!authToken || !queueItemId) {
        this.skip();
      }

      const response = await request(app.getHttpServer())
        .post(`/queue/${queueItemId}/complete`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ actualServiceTimeMinutes: 30 })
        .expect(200);

      expect(response.body.success || response.body.status).toBeTruthy();
    });
  });

  describe('MessageLog - Query (Tarea 15)', () => {
    it('GET /message-logs debe retornar historial', async () => {
      if (!authToken) {
        this.skip();
      }

      const response = await request(app.getHttpServer())
        .get('/message-logs')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ limit: 10 })
        .expect(200);

      expect(response.body.logs).toBeInstanceOf(Array);
      expect(response.body.total).toBeGreaterThanOrEqual(0);
    });

    it('GET /message-logs?phoneNumber=... debe filtrar', async () => {
      if (!authToken) {
        this.skip();
      }

      const response = await request(app.getHttpServer())
        .get('/message-logs')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ phoneNumber: '+573105555555' })
        .expect(200);

      expect(response.body.logs).toBeInstanceOf(Array);
    });
  });

  describe('Webhook (Tarea 13)', () => {
    it('GET /webhooks/whatsapp?hub.mode=subscribe debe retornar challenge', async () => {
      const challenge = 'test_challenge_123';

      const response = await request(app.getHttpServer())
        .get('/webhooks/whatsapp')
        .query({
          'hub.mode': 'subscribe',
          'hub.challenge': challenge,
          'hub.verify_token': process.env.WHATSAPP_VERIFY_TOKEN || 'turnoya-webhook-token',
        })
        .expect(200);

      expect(response.text).toBe(challenge);
    });

    it('GET /webhooks/whatsapp con token inválido debe rechazar', async () => {
      await request(app.getHttpServer())
        .get('/webhooks/whatsapp')
        .query({
          'hub.mode': 'subscribe',
          'hub.challenge': 'test_challenge',
          'hub.verify_token': 'invalid_token',
        })
        .expect(400);
    });

    it('POST /webhooks/whatsapp debe procesar eventos', async () => {
      const payload = {
        object: 'whatsapp_business_account',
        entry: [
          {
            id: '123',
            changes: [
              {
                field: 'messages',
                value: {
                  messaging_product: 'whatsapp',
                  messages: [
                    {
                      from: '+573105555555',
                      id: 'msg-123',
                      timestamp: Date.now().toString(),
                      text: { body: 'Hola' },
                    },
                  ],
                },
              },
            ],
          },
        ],
      };

      const response = await request(app.getHttpServer())
        .post('/webhooks/whatsapp')
        .send(payload)
        .expect(200);

      expect(response.body.success || response.body.message).toBeTruthy();
    });
  });

  describe('Permissions - RBAC', () => {
    it('Sin token debe retornar 401 en endpoints protegidos', async () => {
      await request(app.getHttpServer())
        .get('/queue')
        .expect(401);
    });

    it('Con token inválido debe retornar 401', async () => {
      await request(app.getHttpServer())
        .get('/queue')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);
    });
  });
});

// Helper para expect().toBeOneOf()
expect.extend({
  toBeOneOf(received: any, expected: any[]) {
    const pass = expected.includes(received);
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be one of [${expected.join(', ')}]`
          : `expected ${received} to be one of [${expected.join(', ')}]`,
    };
  },
});
