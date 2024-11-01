import AuthJWT from "../../../../utils/jwt";
import Logs from "../../../../utils/log/logs";

export default async function createTokenAction(user: { user: string; name: string; id: number }, ip: string): Promise<string | null> {
  const token = AuthJWT.create({ user: user.user, name: user.name, id: user.id });
  if (token) {
      await Logs.create({
          title: "Logado no sistema",
          reference: "logged_success",
          content: "Usuário logado com <b>Sucesso</b> no sistema!",
          user_id: user.id,
          ip: ip,
      });
  }
  return token;
}