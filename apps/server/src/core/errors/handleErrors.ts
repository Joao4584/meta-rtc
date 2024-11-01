import type { FastifyReply } from "fastify";
import { RouteError } from "./routeError";
import { sendResponse } from "@/utils/response";

export function handleErrors(error: unknown, reply: FastifyReply) {
  if (error instanceof RouteError) {
    return sendResponse(reply, 400, 'INVALID_ARGUMENTS', error.message);
  }
  console.error("Internal Error: ", error);
  return sendResponse(reply, 500, 'INTERNAL_SERVER_ERROR', "Ocorreu um erro interno.");
}