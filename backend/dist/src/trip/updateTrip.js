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
        const { success: isValidTripId, data: parsedTripId, error: parsedTripIdError, } = Schema_1.IdSchema.safeParse(req.params);
        if (!isValidTripId || !parsedTripId) {
            console.error(parsedTripIdError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid trip id " + parsedTripIdError);
        }
        const TripId = parsedTripId.tripid;
        const { success: isValidRequestBody, data: parsedRequestBody, error: parsedRequestBodyError, } = Schema_1.UpdateTripSchema.safeParse(req.body);
        if (!isValidRequestBody || !parsedRequestBody) {
            console.error(parsedRequestBodyError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body" + parsedRequestBodyError);
        }
        const token = (0, jwt_1.extractToken)(req);
        if (!token)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        const decoded = (0, jwt_1.verifyAuthToken)(token);
        const existing = await (0, query_1.getTripById)(TripId);
        if (!existing)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Trip not found");
        if (existing.userId !== decoded.userId && decoded.role !== "ADMIN") {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "Not authorized to update this trip");
        }
        const payload = {};
        if (parsedRequestBody.destination !== undefined)
            payload.destination = parsedRequestBody.destination;
        if (parsedRequestBody.startDate !== undefined)
            payload.startDate = new Date(parsedRequestBody.startDate);
        if (parsedRequestBody.endDate !== undefined)
            payload.endDate = new Date(parsedRequestBody.endDate);
        if (parsedRequestBody.budget !== undefined)
            payload.budget = parsedRequestBody.budget;
        if (parsedRequestBody.tripType !== undefined)
            payload.tripType = parsedRequestBody.tripType;
        if (parsedRequestBody.description !== undefined)
            payload.description = parsedRequestBody.description;
        if (parsedRequestBody.status !== undefined)
            payload.status = parsedRequestBody.status;
        const updated = await (0, query_2.updateTrip)(TripId, payload);
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