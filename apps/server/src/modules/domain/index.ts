import { FastifyInstance } from "fastify";

//import userRoutes from "./domain/user/routes";
import authRoutes from "./auth/routes";
import userRoutes from "./user/routes";
import helperRoutes from "./helper/routes";

const routes = async (server: FastifyInstance) => {

  await server.register(userRoutes, { prefix: "/users" });
  await server.register(authRoutes, { prefix: "/auth" });
  await server.register(helperRoutes, { prefix: "/h" });
  // await server.register(websocketRoutes, { prefix: "/ws" }); 
};

export default routes;
