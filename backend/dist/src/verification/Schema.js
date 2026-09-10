"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewVerificationSchema = exports.SubmitVerificationSchema = void 0;
const zod_1 = require("zod");
exports.SubmitVerificationSchema = zod_1.z.object({
    type: zod_1.z.enum(["ID_DOCUMENT", "PHONE", "EMAIL", "PASSPORT"]),
    documents: zod_1.z.string().optional(),
});
exports.ReviewVerificationSchema = zod_1.z.object({
    status: zod_1.z.enum(["APPROVED", "REJECTED"]),
});
//# sourceMappingURL=Schema.js.map