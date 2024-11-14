import type { FastifyReply, FastifyRequest } from "fastify";
import type { AuthInput } from "../../auth/schemas/authSchema";
import { handleErrors } from "@/core/errors/handleErrors";
import { sendResponse } from "@/utils/response";
import { UserRepository } from "@/modules/infrastructure/repositories/user.repo";

export async function getMeUserController(request: FastifyRequest, reply: FastifyReply) {

  try {
    const userRepo = new UserRepository(request.user.id);
    const userData = await userRepo.getMeUser();
    if (userData) {
      const configResource = {
        name: { field: 'name' },
        email: { field: 'email' },
        social: {
          field: 'UserSocial',
          children: {
            display_name: true, 
            profile_pic:true,
            is_busy: true,
            last_online: true
          },
        },
      };

       return sendResponse({ fastify: reply, data: userData, config: configResource });
    } else{
        return sendResponse({
          fastify: reply,
          statusCode: 400,
          status: "notFound",
          message: "User not found."
      });
    }


  } catch (error) {
    return handleErrors(error, reply);
  }
}