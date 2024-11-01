import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = {
  email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  name: z.string(),
  user: z.string({
    required_error: "User is required",
  }).min(4, "Full user is required")
};

const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: "password is required",
  }).min(6, "Full password is required"),
});

const createUserResponseSchema = z.object({
  id: z.number(),
  hash: z.string(),
  ...userCore,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
});
