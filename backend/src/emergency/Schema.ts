import { z } from "zod";
import { HttpError } from "../utils/httpResponse";
import { StatusCodes } from "http-status-codes";

export const CreateEmergencyContactSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  relation: z.string().optional(),
});

export const UpdateEmergencyContactSchema = CreateEmergencyContactSchema.partial();

export type CreateEmergencyContactInput = z.infer<typeof CreateEmergencyContactSchema>;
export type UpdateEmergencyContactInput = z.infer<typeof UpdateEmergencyContactSchema>;

export const parseContactId = (value: string | string[] | undefined) => {
      const normalizedValue = Array.isArray(value) ? value[0] : value;
      const id = Number(normalizedValue);
      if (!Number.isInteger(id) || id <= 0) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid emergency contact id");
      return id;
    };
