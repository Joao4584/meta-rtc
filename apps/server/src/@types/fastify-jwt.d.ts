// src/@types/fastify-jwt.d.ts
declare module "fastify-jwt" {
  interface FastifyJWT {
    payload: { id: number; email: string; name: string };
    user: { id: number; email: string; name: string };
  }
}
