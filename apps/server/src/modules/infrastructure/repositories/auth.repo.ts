// * Modules * //

import { compare, hash } from "bcryptjs";
import { prisma } from "../../../config/prisma";
import { RouteError } from "../utils/errors/routeError";
import { GlobalRepository } from "./__global.repo";

// * Exports * //
 
// * Components * //

class AuthRepository extends GlobalRepository {

  private user: string;
	private password: string;
	private email?: string;
	private name?: string;
	private ip_access: string | null;

	constructor(user: string, password: string, ip_access: string | null, email?: string, name?: string) {
    super();
    
		this.user = user;
		this.password = password;
		this.email = email;
		this.name = name;
		this.ip_access = ip_access;
	}

	public async verify() {
		const user = await prisma.users.findFirst({
			where: { 
				OR: [ { user: this.user }, { email: this.user } ]
			},
		});

		if (!user || !(await compare(this.password, user.password))) {
			throw new Error("Usuarío e senha incorretos.");
		}
		if (user) { await this.updateIpAddress(user.id, this.ip_access); }

		return user;
	}

	
}

export { AuthRepository };