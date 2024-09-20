import { getEnvVariable } from "../utils/getEnvVariable";
import jwt, { VerifyErrors } from "jsonwebtoken";

export interface TokenPayloadJWT {
    user: string;
    name: string;
    id: number;
}
export default class AuthJWT {

    static create(payloadContruct: TokenPayloadJWT): string {
		const tokenJWT = jwt.sign(payloadContruct, getEnvVariable("JWT_SECRET_KEY"), { expiresIn: "4h" });
		return tokenJWT;
	}

    static verify(tokenJWT: string): TokenPayloadJWT | false {
        try {
            const payload = jwt.verify(tokenJWT, getEnvVariable("JWT_SECRET_KEY")) as TokenPayloadJWT;
            return payload;
        } catch (error) {
            return false;
        }
    }
}
