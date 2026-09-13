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
  status: z.enum(["OPEN", "FULL", "COMPLETED", "CANCELLED", "DELETE"]).optional(),
});

const routeIdSchema = z.object({
  tripid: z.coerce.number().int().positive(),
});

export const IdSchema = z.preprocess((value) => {
  if (!value || typeof value !== "object") return value;

  const params = value as Record<string, unknown>;
  return {
    tripid: params.tripid ?? params.tripId ?? params.id,
  };
}, routeIdSchema);

export const UserIdSchema = z.preprocess((value) => {
  if (!value || typeof value !== "object") return value;

  const params = value as Record<string, unknown>;
  return {
    userid: params.userid ?? params.userId ?? params.Userid,
  };
}, z.object({
  userid: z.coerce.number().int().positive(),
}));

export type CreateTripInput = z.infer<typeof CreateTripSchema>;
export type UpdateTripInput = z.infer<typeof UpdateTripSchema>;
export type IdInput = z.infer<typeof IdSchema>;
export type UserIdInput = z.infer<typeof UserIdSchema>;