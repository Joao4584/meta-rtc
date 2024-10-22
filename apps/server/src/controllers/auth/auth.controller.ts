import { FastifyReply, FastifyRequest } from "fastify";

import { AuthInput } from "./auth.schema";
import { UserRepository } from "../../repositorys/user.repo";
import Logs from "../../helpers/logs";
import { RouteError } from "../../utils/errors/routeError";
import AuthJWT from "../../helpers/jwt";

export async function authHandler(request: FastifyRequest<{ Body: AuthInput; }>, reply: FastifyReply) {
  try {
    const body = request.body;
    const login = new UserRepository(body.access, body.password, request.ip);
    const user = await login.verify();
    if (user) {
        const hash = AuthJWT.create({ user: user.user, name: user.name, id: user.id})

        if(hash){
          Logs.create({
              title: "Logado no sistema",
              reference: "logged_success",
              content: "Usuário logado com <b>Sucesso</b> no sistema!",
              user_id: user.id,
              ip: request.ip
          });

          return reply.code(200).send({ status: 'success',  message: "Logado com sucesso.", hash: hash });
        } else{
          return reply.code(400).send({ status: 'invalid_create_hash',  message: "Não foi gerar o hash." });
        }
    } else {
        return reply.code(400).send({ status: 'invalid_login',  message: "Não foi possível fazer o login." });
    }
   
  } catch (e) {
    console.log(e);
    if (e instanceof RouteError) {
      return reply.code(400).send({
        status: "INVALID_ARGUMENTS",
        message: e.message
      });
    }
    return reply.code(400).send(e);
  }
}

export async function pingHandler(request: FastifyRequest<{ Body: AuthInput}>, reply: FastifyReply) {

  try{  
    return reply.code(200).send("Pong")
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
