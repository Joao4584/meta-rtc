import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

import buildApp from '@/server'; 

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

beforeAll(async () => {
  await request(app.server)
    .post('/users/')
    .send(defaultUser);
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
  });

  // it('should return 400 for invalid credentials', async () => {
  //   const response = await request(app.server)
  //     .post('/auth')
  //     .send({
  //       access: defaultUser.user,
  //       password: 'wrongpassword' // senha errada
  //     });

  //   expect(response.status).toBe(500);
  //   expect(response.body.status).toBe('invalid_login');
  //   expect(response.body.message).toBe("Não foi possível fazer o login.");
  // });

  it('should return 400 for missing fields', async () => {
    const response = await request(app.server)
      .post('/auth')
      .send({ access: defaultUser.user }); // senha ausente

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  it('should return 400 for missing user field', async () => {
    const response = await request(app.server)
      .post('/auth')
      .send({ password: defaultUser.password }); // usuário ausente

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });
});
