import { FastifyInstance } from "fastify";

import { $ref, userSchemas } from "./schemas/registerUserSchema";
import { $ref as $alterRef, alterSchema } from "./schemas/alterPasswordSchema";

import { registerUserController } from "./controllers/registerUserController";
import { getUserController } from "./controllers/getUserController";
import { getMeUserController } from "./controllers/getMeUserController";
import { alterPasswordController } from "./controllers/alterPasswordController";

const userRoutes = async (server: FastifyInstance) => {

  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  for (const schema of alterSchema) {
    server.addSchema(schema);
  }

  server.post("/", { schema: { body: $ref("createUserSchema"), tags: ["Users"] },
  }, registerUserController);


  server.get("/", {
      preHandler: [server.authenticate]
    }, getUserController
  );
  
  server.put("/password", {
      preHandler: [server.authenticate],
      schema: { body: $alterRef("alterPasswordSchema"), tags: ["Users"] }
    }, alterPasswordController
  );

  server.get("/me", {
    preHandler: [server.authenticate]
  }, getMeUserController
);

};

export default userRoutes;
