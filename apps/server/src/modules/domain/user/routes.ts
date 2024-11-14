import { FastifyInstance } from "fastify";

import { $ref, userSchemas } from "./schemas/registerUserSchema";
import { registerUserController } from "./controllers/registerUserController";
import { getUserController } from "./controllers/getUserController";
import { getMeUserController } from "./controllers/getMeUserController";

const userRoutes = async (server: FastifyInstance) => {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }
  server.post("/", {
    schema: { body: $ref("createUserSchema"), tags: ["Users"], 
    },
  }, registerUserController);


  server.get("/", {
      preHandler: [server.authenticate]
    }, getUserController
  );

  server.get("/me", {
    preHandler: [server.authenticate]
  }, getMeUserController
);

};

export default userRoutes;
