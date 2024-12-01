import type { FastifyReply, FastifyRequest } from "fastify";

import { RouteError } from "@/core/errors/routeError";
import Logs from "@/utils/log/logs";
import { sendResponse } from "@/utils/response";
import type { CreateUserInput } from "../schemas/registerUserSchema";
import { UserRepository } from "@/modules/infrastructure/repositories/user.repo";
import { handleErrors } from "@/core/errors/handleErrors";
import { UserSocialRepository } from "@/modules/infrastructure/repositories/userSocial.repo";

export async function registerUserController(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {
  const { user, password, email, name } = request.body;
  const ip = request.ip;

  try {
    const userRepo = new UserRepository();
    const newUser = await userRepo.createUser(user, password, ip, email, name);

    if (newUser) {
      const userSocial = new UserSocialRepository();
      const newSocial = userSocial.create({
        idUser: newUser?.id,
        name: newUser.name
      })

      Logs.create({
        title: "Cadastrado no sistema", 
        reference: "register_success",
        content: "Usuário cadastrado com sucesso.",
        user_id: newUser.id,
        ip
      });

      return sendResponse({
        fastify: reply,
        statusCode: 200,
        status: "success",
        message: "Cadastrado com sucesso.",
        data: { identify: newUser.id }
      });
    }

    return sendResponse({
      fastify: reply,
      statusCode: 400,
      status: "invalid_register",
      message: "Não foi possível criar o usuário."
    });

  } catch (error) {
    return handleErrors(error, reply);
  }
}
