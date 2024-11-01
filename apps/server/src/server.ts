import Fastify from "fastify";
import fastifyJwt from "fastify-jwt";
import fastifyCors from "@fastify/cors";
import { loadEnv } from "@project/env";
import swaggerPlugin from "./plugins/swaggerPlugin";

import registerRoutes from "./modules/domain";
import { authenticate } from "./core/middleware/authenticate";

function buildServer() {
  loadEnv();

  const server = Fastify({ trustProxy: true });

  // @ts-ignore
  server.register(fastifyJwt, { secret: process.env.JWT_SECRET_KEY || "default_secret_key" });
  server.register(fastifyCors, { origin: "http://localhost:3000", credentials: true });
  server.decorate("authenticate", authenticate);
  server.register(swaggerPlugin);

  server.register(registerRoutes);
  return server;
}

export default buildServer;
