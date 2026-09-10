import { z } from "zod";

export const CreateMatchRequestSchema = z.object({
  receiverId: z.number().int().positive(),
});

export const RespondMatchRequestSchema = z.object({
  status: z.enum(["ACCEPTED", "REJECTED"]),
});

export type CreateMatchRequestInput = z.infer<typeof CreateMatchRequestSchema>;
export type RespondMatchRequestInput = z.infer<typeof RespondMatchRequestSchema>;
