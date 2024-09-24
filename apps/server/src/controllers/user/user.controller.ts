import { FastifyReply, FastifyRequest } from "fastify";

import { CreateUserInput } from "./user.schema";
import { UserRepository } from "../../repositorys/user.repo";
import Logs from "../../helpers/logs";
import { RouteError } from "../../utils/errors/routeError";

export async function registerUserHandler(request: FastifyRequest<{ Body: CreateUserInput; }>, reply: FastifyReply) {
  const body = request.body;

  try {
    const register = new UserRepository(body.user, body.password, request.ip, body.email, body.name);
    const user = await register.createUser();

    if (user) {
        Logs.create({
            title: "Cadastrado no sistema", 
            reference: "register_success",
            content: "Usuário cadastrado no sistema.",
            user_id: user.id,
            ip: request.ip
        });

        return reply.code(200).send({ status: 'success', message: "Cadastrado com sucesso.", data: { identify: user.id} });
    } else {
        return reply.code(400).send({ status: 'invalid_register',  message: "Não foi possível criar o usuário." });
    }
  } catch (e) {
    if (e instanceof RouteError) {
      return reply.code(e.statusCode).send({
        status: e.status.toString(),
        message: e.message
      });
    }
    console.log(e);
    return reply.code(500).send(e);
  }
}

