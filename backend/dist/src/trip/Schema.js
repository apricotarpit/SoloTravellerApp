"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdSchema = exports.IdSchema = exports.UpdateTripSchema = exports.CreateTripSchema = void 0;
const zod_1 = require("zod");
exports.CreateTripSchema = zod_1.z.object({
    destination: zod_1.z.string().min(1),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    budget: zod_1.z.number().int().optional(),
    tripType: zod_1.z.enum(["TREKKING", "ROADTRIP", "BEACH", "CAMPING", "SIGHTSEEING", "BUSINESS"]),
    description: zod_1.z.string().optional(),
});
exports.UpdateTripSchema = exports.CreateTripSchema.partial().extend({
    status: zod_1.z.enum(["OPEN", "FULL", "COMPLETED", "CANCELLED", "DELETE"]).optional(),
});
const routeIdSchema = zod_1.z.object({
    tripid: zod_1.z.coerce.number().int().positive(),
});
exports.IdSchema = zod_1.z.preprocess((value) => {
    if (!value || typeof value !== "object")
        return value;
    const params = value;
    return {
        tripid: params.tripid ?? params.tripId ?? params.id,
    };
}, routeIdSchema);
exports.UserIdSchema = zod_1.z.preprocess((value) => {
    if (!value || typeof value !== "object")
        return value;
    const params = value;
    return {
        userid: params.userid ?? params.userId ?? params.Userid,
    };
}, zod_1.z.object({
    userid: zod_1.z.coerce.number().int().positive(),
}));
//# sourceMappingURL=Schema.js.map