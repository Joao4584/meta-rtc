import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

import buildApp from '@/config/server'; 

let app: FastifyInstance; 
const prisma = new PrismaClient(); 

beforeAll(async () => {
  app = buildApp(); 
  await app.ready(); 
});

const defaultUser = {
  user: 'testauth',
  password: 'password123',
  email: 'testauth@example.com',
  name: 'Test Auth'
};

let bearerToken = null;

beforeAll(async () => {
  await request(app.server).post('/users/').send(defaultUser);
});

afterAll(async () => {
  await prisma.logs.deleteMany({
    where: { user: { user: defaultUser.user } }
  });
  await prisma.users.deleteMany({ where: { user: defaultUser.user } });
  await app.close(); 
});

// * Tests
describe('User Authentication', () => {
  it('should log in successfully with valid credentials', async () => {
    const response = await request(app.server)
      .post('/auth')
      .send({
        access: defaultUser.user,
        password: defaultUser.password
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Logado com sucesso.');
    expect(response.body).toHaveProperty('hash');
    bearerToken = response.body.hash;
  });

  it('should that the middleware allows me to pass this hash', async () => {
    const response = await request(app.server)
      .get('/auth/ping').set('Authorization', `Bearer ${bearerToken}`).send({});
    expect(response.status).toBe(200);
  });

  it('should that the middleware does not allow passing this hash', async () => {
    const response = await request(app.server)
      .get('/auth/ping').set('Authorization', `Bearer ${bearerToken + Math.floor(Math.random() * 10)}`).send({});
    expect(response.status).toBe(401);
  });

  it('should having error in the password six length', async () => {
    const response = await request(app.server)
      .post('/auth')
      .send({
        access: defaultUser.user,
        password: "12345"
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  it('should return 400 for missing fields', async () => {
    const response = await request(app.server)
      .post('/auth')
      .send({ access: defaultUser.user })

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  it('should return 400 for missing user field', async () => {
    const response = await request(app.server)
      .post('/auth')
      .send({ password: defaultUser.password }); 

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });



});
