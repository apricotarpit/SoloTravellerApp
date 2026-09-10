"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePackingListSchema = exports.CreatePackingListSchema = void 0;
const zod_1 = require("zod");
exports.CreatePackingListSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    destination: zod_1.z.string().optional(),
    startDate: zod_1.z.string().datetime().optional(),
    endDate: zod_1.z.string().datetime().optional(),
    items: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string().min(1),
        quantity: zod_1.z.number().int().positive().default(1),
        category: zod_1.z.string().optional(),
        checked: zod_1.z.boolean().default(false),
    })).default([]),
});
exports.UpdatePackingListSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    destination: zod_1.z.string().optional(),
    startDate: zod_1.z.string().datetime().nullable().optional(),
    endDate: zod_1.z.string().datetime().nullable().optional(),
    items: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string().min(1),
        quantity: zod_1.z.number().int().positive().default(1),
        category: zod_1.z.string().optional(),
        checked: zod_1.z.boolean().default(false),
    })).optional(),
}).refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
});
//# sourceMappingURL=Schema.js.map