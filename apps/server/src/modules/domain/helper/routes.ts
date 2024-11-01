import { FastifyInstance } from "fastify";
import { pingController } from "./controllers/pingController";


const helperRoutes = async (server: FastifyInstance) => {
  server.post("/", async () => {
    return { status: "OK" };
  });

  server.get("/ping", { 
      schema: { tags: ["Authentication"], },
      preHandler: [server.authenticate]
    }, pingController
  );
};

export default helperRoutes;
