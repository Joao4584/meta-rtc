
import { prisma } from "../prisma";

interface createProps {
		title: string;
		reference: string;
		content: string;
		user_id: number;
		link_id?: number | null;
		ip?: string
}
class Logs {

	static async create({title, content, reference, user_id, link_id, ip}: createProps){
		const log = await prisma.logs.create({
      data: {
        title: title,
        content: content,
        reference: reference,
        user_id: user_id,
        link_id: link_id,
				ip_access: ip
      },
    });

		if (!log) { throw new Error("Não foi possivel criar o Log."); }

		return log;
	}

}

export default Logs;