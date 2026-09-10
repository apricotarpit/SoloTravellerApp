import { z } from "zod";

export const CreateTripSchema = z.object({
  destination: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().int().optional(),
  tripType: z.enum(["TREKKING", "ROADTRIP", "BEACH", "CAMPING", "SIGHTSEEING", "BUSINESS"]),
  description: z.string().optional(),
});

export const UpdateTripSchema = CreateTripSchema.partial().extend({
  status: z.enum(["OPEN", "FULL", "COMPLETED", "CANCELLED"]).optional(),
});

export type CreateTripInput = z.infer<typeof CreateTripSchema>;
export type UpdateTripInput = z.infer<typeof UpdateTripSchema>;
