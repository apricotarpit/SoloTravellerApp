import { z } from "zod";

export const SendFriendRequestSchema = z.object({
  receiverId: z.number().int(),
  message: z.string().optional(),
});

export const RespondFriendRequestSchema = z.object({
  status: z.enum(["ACCEPTED", "REJECTED"]),
});

export type SendFriendRequestInput = z.infer<typeof SendFriendRequestSchema>;
export type RespondFriendRequestInput = z.infer<typeof RespondFriendRequestSchema>;
