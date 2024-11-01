import type { FastifyReply, FastifyRequest } from "fastify";
import type { AuthInput } from "../../auth/schemas/authSchema";
import { RouteError } from "@/core/errors/routeError";

export async function pingController(request: FastifyRequest, reply: FastifyReply) {

  try{  
    return reply.code(200).send({"Pong": request.user.name})


  } catch (e) {
    if (e instanceof RouteError) {
      return reply.code(400).send({
        status: "INVALID_ARGUMENTS",
        message: e.message
      });
    }
    console.log(e);
    return reply.code(500).send(e);
  }
}