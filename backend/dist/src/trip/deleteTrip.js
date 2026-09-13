"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTripHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const jwt_1 = require("../auth/jwt");
const query_1 = require("./query");
const Schema_1 = require("./Schema");
const deleteTripHandler = async (req, res) => {
    try {
        const { success: isValidTripId, data: parsedTripId, error: parsedTripIdError, } = Schema_1.IdSchema.safeParse(req.params);
        if (!isValidTripId || !parsedTripId) {
            console.error(parsedTripIdError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid trip id " + parsedTripIdError);
        }
        const TripId = parsedTripId.tripid;
        const token = (0, jwt_1.extractToken)(req);
        if (!token)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        const decoded = (0, jwt_1.verifyAuthToken)(token);
        const Trip = await (0, query_1.getTripById)(TripId);
        if (!Trip)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Trip not found");
        if (Trip.userId !== decoded.userId && decoded.role !== "ADMIN") {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "Not authorized to delete this trip");
        }
        await (0, query_1.deleteTrip)(TripId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Trip deleted", data: Trip });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError) {
            return res.status(error.status).json({ success: false, message: error.message });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.deleteTripHandler = deleteTripHandler;
//# sourceMappingURL=deleteTrip.js.map