// * Modules * //

import { compare, hash } from "bcryptjs";
import { prisma } from "@/config/prisma";
import { RouteError } from "@/core/errors/routeError";
import { GlobalRepository } from "./__global.repo";

// * Exports * //
 
// * Components * //


interface CreateUserSocialProps {
  idUser: number,
  name: string,
}
class UserSocialRepository extends GlobalRepository {

  private idUserSocial: number | null;

	constructor(idUserSocial: number | null = null) {
		super();
		this.idUserSocial = idUserSocial;
	}

  public async create(data: CreateUserSocialProps) {
    if (!data.idUser) {
      throw new RouteError({ 
        message: "User id is required create User Social",
        status: "ERROR_CREATE_USER",
        statusCode: 500
      }) 
    }

    try {
      const userSocial = await prisma.userSocial.upsert({
        where: { user_id: data.idUser },
        create: { user_id: data.idUser },
        update: {} 
      });

      return { id: userSocial.id }; 
    } catch (error) {
      console.error("Error creating UserSocial:", error);
      throw new RouteError({
        message: "Error creating User Social",
        status: "ERROR_CREATE_USER",
        statusCode: 409
      }) 
    }
  }
}
export { UserSocialRepository };