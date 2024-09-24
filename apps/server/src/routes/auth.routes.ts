import { FastifyInstance } from "fastify";
import { authHandler, pingHandler } from "../controllers/auth/auth.controller";
import { $ref, authSchemas } from "../controllers/auth/auth.schema";

async function authRoutes(server: FastifyInstance) {

  for (const schema of authSchemas) {
    server.addSchema(schema);
  }
 
  server.post("/", {
      schema: {
        body: $ref("loginSchema"),
        tags: ["Authentication"],
      },
    }, authHandler
  );

  server.get("/ping", {
      schema: {
        tags: ["Authentication"],
      },
      preHandler: [server.authenticate]
    }, pingHandler
  );

}

export default authRoutes;
