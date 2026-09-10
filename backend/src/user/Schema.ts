import { z } from "zod";

const optionalQueryText = z.preprocess((value) => {
    if (typeof value !== "string") {
        return value;
    }

    const trimmedValue = value.trim();
    return trimmedValue === "" ? undefined : trimmedValue;
}, z.string().optional());

export const UserFilterQuerySchema = z.object({
    city: z.string().optional(),
    profession: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    role: z.enum(["USER", "ADMIN"]).optional(),
    isActive: z
        .union([z.literal("true"), z.literal("false"), z.boolean()])
        .transform((value) => value === true || value === "true")
        .optional(),
    limit: z.coerce.number().int().positive().default(10),
    offset: z.coerce.number().int().nonnegative().default(0),
});

export type UserFilterQueryInput = z.infer<typeof UserFilterQuerySchema>;

export const userResponseSchema = z.object({
    id: z.number().int(),
    fullName: z.string(),
    email: z.string().email(),
    role: z.enum(["USER", "ADMIN"]),
    profession: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    profileImage: z.string().nullable().optional(),
    age: z.number().int(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(), 
});

export const paginatedUsersResponseSchema = z.object({
    total: z.number().int().positive(),
    limit: z.number().int().positive(),
    offset: z.number().int().nonnegative(),
    data: z.array(userResponseSchema),
});
