import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const alterPasswordSchema = z.object({
  oldPassword: z.string({
    required_error: "old password is required",
  }).min(6, "Full password is required"),
  newPassword: z.string({
    required_error: "new password is required",
  }).min(6, "Full password is required"),
});


export type AlterPasswordInput = z.infer<typeof alterPasswordSchema>;
export const { schemas: alterSchema, $ref } = buildJsonSchemas({
  alterPasswordSchema,
});
