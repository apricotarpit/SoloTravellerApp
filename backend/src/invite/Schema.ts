import { z } from "zod";

export const CreateInviteSchema = z.object({
  receiverId: z.number().int().positive(),
  message: z.string().trim().max(500).optional(),
});

export const RespondInviteSchema = z.object({
  status: z.enum(["ACCEPTED", "DECLINED"]),
});

export type CreateInviteInput = z.infer<typeof CreateInviteSchema>;
export type RespondInviteInput = z.infer<typeof RespondInviteSchema>;
