import { z } from "zod";

export const CreateEmergencyContactSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  relation: z.string().optional(),
});

export const UpdateEmergencyContactSchema = CreateEmergencyContactSchema.partial();

export type CreateEmergencyContactInput = z.infer<typeof CreateEmergencyContactSchema>;
export type UpdateEmergencyContactInput = z.infer<typeof UpdateEmergencyContactSchema>;
