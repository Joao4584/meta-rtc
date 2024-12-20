// * Modules * //

import { compare, hash } from "bcryptjs";
import { prisma } from "@/config/prisma";
import { RouteError } from "@/core/errors/routeError";
import { GlobalRepository } from "./__global.repo";

// * Exports * //
 
// * Components * //
interface AlterPasswordProps{
	passwordNew: string,
	passwordOld
}
class UserRepository extends GlobalRepository {

  private id_user: number | null;

	constructor(id_user: number | null = null) {
		super();
		this.id_user = id_user;
	}

	public async createUser(user: string, password: string, ip_access: string | null, email?: string, name?: string) {
		if (name && email) {
			const existingUser = await prisma.users.findFirst({
				where: {
					OR: [ 
						{ user: user }, { email: email },
					],
				},
			});

			if (existingUser) { 
				throw new RouteError({
					message: "Usuario ou email já existente",
					status: "ALREADY_EXISTS",
					statusCode: 409
				}) 
			}

			const hashedPassword = await hash(password, 12);
			const newUser = await prisma.users.create({
				data: { user: user, name: name, password: hashedPassword, email: email }
			});
			if(newUser){ await this.updateIpAddress(newUser.id, ip_access); }

			return newUser;
		}
	}


	public async getMeUser(){
		if(this.id_user){
			const meUser = await prisma.users.findFirst({
				where: {
					id: this.id_user
				},
				include: {
					UserSocial: true
				}
			});
		
				return meUser;
		}
		return null;
	}

	public async alterPassword(data: AlterPasswordProps){
		if(this.id_user){
			const user = await prisma.users.findFirst({
				where: { 
					id: this.id_user
				},
			});
	
			if (!user || !(await compare(data.passwordOld, user.password))) {
				throw new RouteError({
					status: "password_incorrect",
					message: "senha incorreta.",
					statusCode: 400
				});
			}

			const hashedPassword = await hash(data.passwordNew, 12);
			const alterUser = await prisma.users.update({
				where: { id: this.id_user},
				data: {
					password: hashedPassword
				}
			})

			return alterUser;

		}

		return false;
	}


}

export { UserRepository };