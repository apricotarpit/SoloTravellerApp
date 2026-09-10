"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTripHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const jwt_1 = require("../auth/jwt");
const query_1 = require("./query");
const Schema_1 = require("./Schema");
const query_2 = require("./query");
const updateTripHandler = async (req, res) => {
    try {
        const parsed = Schema_1.UpdateTripSchema.safeParse(req.body);
        if (!parsed.success || !parsed.data)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body");
        const token = (0, jwt_1.extractToken)(req);
        if (!token)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        const decoded = (0, jwt_1.verifyAuthToken)(token);
        const id = Number(req.params.id);
        if (Number.isNaN(id))
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid trip id");
        const existing = await (0, query_1.getTripById)(id);
        if (!existing)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Trip not found");
        if (existing.userId !== decoded.userId && decoded.role !== "ADMIN") {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "Not authorized to update this trip");
        }
        const payload = {};
        if (parsed.data.destination !== undefined)
            payload.destination = parsed.data.destination;
        if (parsed.data.startDate !== undefined)
            payload.startDate = new Date(parsed.data.startDate);
        if (parsed.data.endDate !== undefined)
            payload.endDate = new Date(parsed.data.endDate);
        if (parsed.data.budget !== undefined)
            payload.budget = parsed.data.budget;
        if (parsed.data.tripType !== undefined)
            payload.tripType = parsed.data.tripType;
        if (parsed.data.description !== undefined)
            payload.description = parsed.data.description;
        if (parsed.data.status !== undefined)
            payload.status = parsed.data.status;
        const updated = await (0, query_2.updateTrip)(id, payload);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Trip updated", data: updated });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError) {
            return res.status(error.status).json({ success: false, message: error.message });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.updateTripHandler = updateTripHandler;
//# sourceMappingURL=updateTrip.js.map