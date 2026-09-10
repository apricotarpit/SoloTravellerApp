"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordSchema = exports.UpdateProfileSchema = exports.LoginSchema = exports.CreateSchema = void 0;
const zod_1 = require("zod");
exports.CreateSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, "Full name is required"),
    email: zod_1.z.string().email("Valid email is required"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    phone: zod_1.z.string().optional(),
    age: zod_1.z.coerce.number().int().positive(),
    gender: zod_1.z.enum(["MALE", "FEMALE", "OTHER"]),
    profession: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    bio: zod_1.z.string().optional(),
    profileImage: zod_1.z.string().optional(),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Valid email is required"),
    password: zod_1.z.string().min(1, "Password is required"),
});
exports.UpdateProfileSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, "Full name is required").optional(),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().email("Valid email is required").optional(),
    age: zod_1.z.coerce.number().int().positive().optional(),
    gender: zod_1.z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    profession: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    bio: zod_1.z.string().optional(),
    profileImage: zod_1.z.string().optional(),
});
exports.ChangePasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string().min(1, "Old password is required"),
    newPassword: zod_1.z.string().min(6, "New password must be at least 6 characters long"),
});
//# sourceMappingURL=Schema.js.map