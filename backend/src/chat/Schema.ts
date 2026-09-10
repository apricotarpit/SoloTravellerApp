import { z } from "zod";

export const CreateChatSchema = z.object({
  participantIds: z.array(z.number().int()).min(1),
});

export const SendMessageSchema = z.object({
  content: z.string().min(1).max(2000),
});

export const UpdateMessageStatusSchema = z.object({
  delivered: z.boolean().optional(),
  read: z.boolean().optional(),
}).partial();

export type CreateChatInput = z.infer<typeof CreateChatSchema>;
export type SendMessageInput = z.infer<typeof SendMessageSchema>;
export type UpdateMessageStatusInput = z.infer<typeof UpdateMessageStatusSchema>;
