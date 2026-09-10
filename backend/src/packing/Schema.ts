import { z } from "zod";

export const CreatePackingListSchema = z.object({
  name: z.string().min(1),
  destination: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  items: z.array(z.object({
    name: z.string().min(1),
    quantity: z.number().int().positive().default(1),
    category: z.string().optional(),
    checked: z.boolean().default(false),
  })).default([]),
});

export const UpdatePackingListSchema = z.object({
  name: z.string().min(1).optional(),
  destination: z.string().optional(),
  startDate: z.string().datetime().nullable().optional(),
  endDate: z.string().datetime().nullable().optional(),
  items: z.array(z.object({
    name: z.string().min(1),
    quantity: z.number().int().positive().default(1),
    category: z.string().optional(),
    checked: z.boolean().default(false),
  })).optional(),
}).refine((value) => Object.keys(value).length > 0, {
  message: "At least one field is required",
});

export type CreatePackingListInput = z.infer<typeof CreatePackingListSchema>;
export type UpdatePackingListInput = z.infer<typeof UpdatePackingListSchema>;
