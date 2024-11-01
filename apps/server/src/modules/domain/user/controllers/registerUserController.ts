import type { FastifyReply, FastifyRequest } from "fastify";

import { RouteError } from "@/core/errors/routeError";
import Logs from "@/utils/log/logs";
import { sendResponse } from "@/utils/response";
import type { CreateUserInput } from "../schemas/registerUserSchema";
import { UserRepository } from "@/modules/infrastructure/repositories/user.repo";
import { handleErrors } from "@/core/errors/handleErrors";

export async function registerUserController(request: FastifyRequest<{ Body: CreateUserInput }>, reply: FastifyReply) {
  const { user, password, email, name } = request.body;
  const ip = request.ip;

  try {
    const userRepo = new UserRepository();
    const newUser = await userRepo.createUser(user, password, ip, email, name);

    if (newUser) {
      Logs.create({
        title: "Cadastrado no sistema", 
        reference: "register_success",
        content: "Usuário cadastrado com sucesso.",
        user_id: newUser.id,
        ip
      });

      return sendResponse(reply, 200, 'success', "Cadastrado com sucesso.", { identify: newUser.id });
    }

    return sendResponse(reply, 400, 'invalid_register', "Não foi possível criar o usuário.");

  } catch (error) {
    return handleErrors(error, reply);
  }
}



