"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespondInviteSchema = exports.CreateInviteSchema = void 0;
const zod_1 = require("zod");
exports.CreateInviteSchema = zod_1.z.object({
    receiverId: zod_1.z.number().int().positive(),
    message: zod_1.z.string().trim().max(500).optional(),
});
exports.RespondInviteSchema = zod_1.z.object({
    status: zod_1.z.enum(["ACCEPTED", "DECLINED"]),
});
//# sourceMappingURL=Schema.js.map