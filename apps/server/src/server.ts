import Fastify from "fastify";
import fastifyJwt from "fastify-jwt";
import swagger from "fastify-swagger";
import { withRefResolver } from "fastify-zod";
import { loadEnv } from "@project/env"

import userRoutes from "./routes/user.routes";
import { version } from "../package.json";
import { authenticate } from "./middleware/authenticate";
import authRoutes from "./routes/auth.routes";

function buildServer() {
  loadEnv();
  
  const server = Fastify({
    trustProxy: true
  });

  // @ts-ignore
  server.register(fastifyJwt, { secret: process.env.JWT_SECRET_KEY || "default_secret_key" });

  server.decorate("authenticate", authenticate);

  // Configuração do Swagger
  server.register(
    swagger,
    withRefResolver({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Fastify API",
          description: "API documentation",
          version,
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    })
  );

  // Listener Server
  server.register(userRoutes, { prefix: "/users" });
  server.register(authRoutes, { prefix: "/auth" });

  server.get("/healthcheck", async () => {
    return { status: "OK" };
  });

  return server;
}

export default buildServer;
