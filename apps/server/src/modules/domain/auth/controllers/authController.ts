import type { FastifyReply, FastifyRequest } from "fastify";
import type { AuthInput } from "../schemas/authSchema";
import createTokenAction from "../actions/createTokenAction";
import { RouteError } from "@/core/errors/routeError";
import { AuthRepository } from "@/modules/infrastructure/repositories/auth.repo";

export async function authController(request: FastifyRequest<{ Body: AuthInput }>, reply: FastifyReply) {
  const { access, password } = request.body;
  const { ip } = request;

  try {
      const authRepo = new AuthRepository(access, password, ip);
      const user = await authRepo.verify();

      if (!user) {
          return reply.code(400).send({ status: 'invalid_login', message: "Não foi possível fazer o login." });
      }

      const token = await createTokenAction(user, ip);
      if (!token) {
          return reply.code(400).send({ status: 'invalid_create_hash', message: "Não foi possível gerar o hash." });
      }

      return reply.code(200).send({ status: 'success', message: "Logado com sucesso.", hash: token });

  } catch (error) {
      console.error(error);
      if (error instanceof RouteError) {
          return reply.code(400).send({
              status: "INVALID_ARGUMENTS",
              message: error.message
          });
      }
      return reply.code(500).send({ status: "error", message: "Ocorreu um erro interno." });
  }
}