import { FastifyInstance } from "fastify";

import {authController} from "./controllers/authController";
import { $ref, authSchemas } from "./schemas/authSchema";

const authRoutes = async (server: FastifyInstance) => {
  for (const schema of authSchemas) {
    server.addSchema(schema);
  }
  server.post("/", {
    schema: { body: $ref("loginSchema"), tags: ["Authentication"] },
  }, authController);
};

export default authRoutes;
