"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatedUsersResponseSchema = exports.userResponseSchema = exports.UserFilterQuerySchema = void 0;
const zod_1 = require("zod");
const optionalQueryText = zod_1.z.preprocess((value) => {
    if (typeof value !== "string") {
        return value;
    }
    const trimmedValue = value.trim();
    return trimmedValue === "" ? undefined : trimmedValue;
}, zod_1.z.string().optional());
exports.UserFilterQuerySchema = zod_1.z.object({
    city: zod_1.z.string().optional(),
    profession: zod_1.z.string().optional(),
    gender: zod_1.z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    role: zod_1.z.enum(["USER", "ADMIN"]).optional(),
    isActive: zod_1.z
        .union([zod_1.z.literal("true"), zod_1.z.literal("false"), zod_1.z.boolean()])
        .transform((value) => value === true || value === "true")
        .optional(),
    limit: zod_1.z.coerce.number().int().positive().default(10),
    offset: zod_1.z.coerce.number().int().nonnegative().default(0),
});
exports.userResponseSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    fullName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    role: zod_1.z.enum(["USER", "ADMIN"]),
    profession: zod_1.z.string().nullable().optional(),
    city: zod_1.z.string().nullable().optional(),
    bio: zod_1.z.string().nullable().optional(),
    phone: zod_1.z.string().nullable().optional(),
    profileImage: zod_1.z.string().nullable().optional(),
    age: zod_1.z.number().int(),
    gender: zod_1.z.enum(["MALE", "FEMALE", "OTHER"]),
    isActive: zod_1.z.boolean(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.paginatedUsersResponseSchema = zod_1.z.object({
    total: zod_1.z.number().int().positive(),
    limit: zod_1.z.number().int().positive(),
    offset: zod_1.z.number().int().nonnegative(),
    data: zod_1.z.array(exports.userResponseSchema),
});
//# sourceMappingURL=Schema.js.map