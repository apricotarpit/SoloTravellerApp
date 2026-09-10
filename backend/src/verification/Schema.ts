import { z } from "zod";

export const SubmitVerificationSchema = z.object({
  type: z.enum(["ID_DOCUMENT", "PHONE", "EMAIL", "PASSPORT"]),
  documents: z.string().optional(),
});

export const ReviewVerificationSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
});

export type SubmitVerificationInput = z.infer<typeof SubmitVerificationSchema>;
export type ReviewVerificationInput = z.infer<typeof ReviewVerificationSchema>;
