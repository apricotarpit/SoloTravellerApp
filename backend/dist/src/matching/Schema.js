"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespondMatchRequestSchema = exports.CreateMatchRequestSchema = void 0;
const zod_1 = require("zod");
exports.CreateMatchRequestSchema = zod_1.z.object({
    receiverId: zod_1.z.number().int().positive(),
});
exports.RespondMatchRequestSchema = zod_1.z.object({
    status: zod_1.z.enum(["ACCEPTED", "REJECTED"]),
});
//# sourceMappingURL=Schema.js.map