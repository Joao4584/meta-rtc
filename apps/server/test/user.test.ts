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

afterAll(async () => {
  await prisma.logs.deleteMany({
    where: { user: { user: 'testuser' } }
  });

  await prisma.users.deleteMany({ where: { user: 'testuser' } });
  await app.close(); 
});


// * Tests
let defaultUser = {
  user: 'testuser',
  password: 'password123',
  email: 'test@example.com',
  name: 'Test User'
};

describe('User Registration', () => {
  it('should register a new user successfully', async () => {
    const response = await request(app.server)
      .post('/users/') 
      .send(defaultUser);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Cadastrado com sucesso.');
    expect(response.body.data).toHaveProperty('identify');
  });


  it('should return 400 for missing fields', async () => {
    const response = await request(app.server)
      .post('/users/')
      .send({ user: 'testuser'});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });


  it('should return an existing user error', async () => {

    const response = await request(app.server)
      .post('/users/')
      .send(defaultUser);

    expect(response.status).toBe(409);
  });
});
