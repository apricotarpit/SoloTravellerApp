"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmergencyContactSchema = exports.CreateEmergencyContactSchema = void 0;
const zod_1 = require("zod");
exports.CreateEmergencyContactSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    phone: zod_1.z.string().min(1),
    relation: zod_1.z.string().optional(),
});
exports.UpdateEmergencyContactSchema = exports.CreateEmergencyContactSchema.partial();
//# sourceMappingURL=Schema.js.map