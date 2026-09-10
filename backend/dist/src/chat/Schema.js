"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMessageStatusSchema = exports.SendMessageSchema = exports.CreateChatSchema = void 0;
const zod_1 = require("zod");
exports.CreateChatSchema = zod_1.z.object({
    participantIds: zod_1.z.array(zod_1.z.number().int()).min(1),
});
exports.SendMessageSchema = zod_1.z.object({
    content: zod_1.z.string().min(1).max(2000),
});
exports.UpdateMessageStatusSchema = zod_1.z.object({
    delivered: zod_1.z.boolean().optional(),
    read: zod_1.z.boolean().optional(),
}).partial();
//# sourceMappingURL=Schema.js.map