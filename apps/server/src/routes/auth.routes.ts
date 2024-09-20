import { FastifyInstance } from "fastify";
import { authHandler } from "../controllers/auth/auth.controller";
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

  server.post("/validate", {
      schema: {
        body: $ref("loginSchema"),
        tags: ["Authentication"],
      },
    }, authHandler
  );

}

export default authRoutes;
