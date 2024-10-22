import Fastify from "fastify";
import fastifyJwt from "fastify-jwt";
import swagger from "@fastify/swagger"; 
import { loadEnv } from "@project/env";
import fastifyCors from "@fastify/cors";
import userRoutes from "./routes/user.routes";
import { version } from "../package.json";
import { authenticate } from "./middleware/authenticate";
import authRoutes from "./routes/auth.routes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

function buildServer() {
  loadEnv();

  const server = Fastify({
    trustProxy: true
  });

  // @ts-ignore
  server.register(fastifyJwt, { secret: process.env.JWT_SECRET_KEY || "default_secret_key" });

  server.register(fastifyCors, { origin: "http://localhost:3000", credentials: true, });
  server.decorate("authenticate", authenticate);

  const swaggerOptions = {
    swagger: {
      info: {
        title: "My Title",
        description: "My Description.",
        version,
      },
      host: "localhost",
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [{ name: "Default", description: "Default" }],
    },
  };

  const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
  };

  server.register(swagger, swaggerOptions); 
  server.register(fastifySwaggerUi, swaggerUiOptions); 

  // Listener Server
  server.register(userRoutes, { prefix: "/users" });
  server.register(authRoutes, { prefix: "/auth" });

  server.get("/healthcheck", async () => {
    return { status: "OK" };
  });

  return server;
}

export default buildServer;
