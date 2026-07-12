import { z } from "zod";

export const CreateSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().optional(),
    age: z.coerce.number().int().positive(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    profession: z.string().optional(),
    city: z.string().optional(),
    bio: z.string().optional(),
    profileImage: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof CreateSchema>;

export const LoginSchema = z.object({
    email: z.string().email("Valid email is required"),
    password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const ChangePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters long"),
});

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;