"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchRequestsHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const jwt_1 = require("../auth/jwt");
const query_1 = require("./query");
const Schema_1 = require("../trip/Schema");
const getMatchRequestsHandler = async (req, res) => {
    try {
        const { success: isValidTripId, data: parsedTripId, error: parsedTripIdError, } = Schema_1.IdSchema.safeParse(req.params);
        if (!isValidTripId || !parsedTripId) {
            console.error(parsedTripIdError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid trip id " + parsedTripIdError);
        }
        const TripId = parsedTripId.tripid;
        const trip = await (0, query_1.findTripById)(TripId);
        const token = (0, jwt_1.extractToken)(req);
        if (!token)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        const userId = (0, jwt_1.verifyAuthToken)(token).userId;
        ;
        if (!trip)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Trip not found");
        if (trip.userId !== userId) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "Only the trip owner can view match requests");
        }
        const requests = await (0, query_1.getMatchRequestsByTripId)(TripId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Match requests fetched", data: requests });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.getMatchRequestsHandler = getMatchRequestsHandler;
//# sourceMappingURL=getMatchRequests.js.map