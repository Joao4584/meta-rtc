import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const authCore = {
  access: z.string({
    required_error: "access is required"
  }),
  password: z.string({
    required_error: "password is required",
  }).min(6, "Full password is required")
};

const loginSchema = z.object({
  ...authCore
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type AuthInput = z.infer<typeof loginSchema>;
export const { schemas: authSchemas, $ref } = buildJsonSchemas({
  loginSchema,
  loginResponseSchema,
});
