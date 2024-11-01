import type { FastifyReply, FastifyRequest } from "fastify";
import type { AuthInput } from "../../auth/schemas/authSchema";
import { handleErrors } from "@/core/errors/handleErrors";
import { sendResponse } from "@/utils/response";

export async function getUserController(request: FastifyRequest, reply: FastifyReply) {

  try {


  } catch (error) {
    return handleErrors(error, reply);
  }
}