"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespondFriendRequestSchema = exports.SendFriendRequestSchema = void 0;
const zod_1 = require("zod");
exports.SendFriendRequestSchema = zod_1.z.object({
    receiverId: zod_1.z.number().int(),
    message: zod_1.z.string().optional(),
});
exports.RespondFriendRequestSchema = zod_1.z.object({
    status: zod_1.z.enum(["ACCEPTED", "REJECTED"]),
});
//# sourceMappingURL=Schema.js.map