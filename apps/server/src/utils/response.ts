import type { FastifyReply } from "fastify";

export function sendResponse(
  reply: FastifyReply, statusCode: number, status: string, message: string, data: Record<string, any> = {}
) {
  return reply.code(statusCode).send({ status, message, data });
}
