import type { FastifyReply } from "fastify";
import { RouteError } from "./routeError";
import { sendResponse } from "@/utils/response";

export function handleErrors(error: unknown, reply: FastifyReply) {
  if (error instanceof RouteError) {
    return sendResponse({
      fastify: reply,
      statusCode:400,
      message: error.message,
      data: {
        error: error.status ?? "INVALID_ARGUMENTS"
      }

    });
  }
  console.error("Internal Error: ", error);

  return sendResponse({
    fastify: reply,
    statusCode:error.status ?? 500,
    message: error?.message ?? "Ocorreu um erro interno.",
    data: {
      error: "Ocorreu um erro interno"
    }

  });
}