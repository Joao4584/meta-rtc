import { FastifyInstance } from "fastify";
import { registerUserHandler } from "../controllers/user/user.controller";
import { $ref, userSchemas } from "../controllers/user/user.schema";

async function userRoutes(server: FastifyInstance) {

  for (const schema of userSchemas) {
    server.addSchema(schema);
  }
 
  server.post("/", {
      schema: {
        body: $ref("createUserSchema"),
        tags: ["Users"],
        // response: { 201: $ref("createUserResponseSchema") },
      },
    }, registerUserHandler
  );


  // server.post(
  //   "/login",
  //   {
  //     schema: {
  //       body: $ref("loginSchema"),
  //       tags: ["Users"],
  //       response: {
  //         200: $ref("loginResponseSchema"),
  //       },
  //     },
  //   },
  //   loginHandler
  // );

  // server.get(
  //   "/",
  //   {
  //     preHandler: [server.authenticate],
  //   },
  //   getUsersHandler
  // );
}

export default userRoutes;
