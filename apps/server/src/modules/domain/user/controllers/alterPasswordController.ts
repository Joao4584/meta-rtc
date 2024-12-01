import type { FastifyReply, FastifyRequest } from "fastify";

import Logs from "@/utils/log/logs";
import { sendResponse } from "@/utils/response";
import { handleErrors } from "@/core/errors/handleErrors";
import { AuthRepository } from "@/modules/infrastructure/repositories/auth.repo";
import { UserRepository } from "@/modules/infrastructure/repositories/user.repo";
import type { AlterPasswordInput } from "../schemas/alterPasswordSchema";

export async function alterPasswordController(request: FastifyRequest<{ Body: AlterPasswordInput }>, reply: FastifyReply) {
  const ip = request.ip;
  const { oldPassword, newPassword } = request.body;
  try {
    const userRepo = new UserRepository(request.user.id);
    const alterPassword = await userRepo.alterPassword({
      passwordNew: newPassword,
      passwordOld: oldPassword
    });

    if (alterPassword) {
      Logs.create({
        title: "Senha alterada", 
        reference: "register_success",
        content: "Senha alterada com sucesso",
        user_id: request.user.id,
        ip
      });

      return sendResponse({
        fastify: reply,
        statusCode: 200,
        status: "success",
        message: "Senha alterada com sucesso.",
      });
    }

    return sendResponse({
      fastify: reply,
      statusCode: 400,
      status: "invalid_register",
      message: "Não foi possível alterar a senha."
    });

  } catch (error) {
    return handleErrors(error, reply);
  }
}
