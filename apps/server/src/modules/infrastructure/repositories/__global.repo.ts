// * Modules * //

import { prisma } from "@/config/prisma";

// * Exports * //
 
// * Components * //

class GlobalRepository {

	public async updateIpAddress(userId: number, ip_access: string | null): Promise<void> {
		if (ip_access && ip_access.length > 15) {
			ip_access = ip_access.substring(0, 15); 
		}
	
		await prisma.users.update({
			where: { id: userId },
			data: { ip_access: ip_access },
		});
	}
	
}

export { GlobalRepository };