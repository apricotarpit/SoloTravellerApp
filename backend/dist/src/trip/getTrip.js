"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTripHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const query_1 = require("./query");
const Schema_1 = require("./Schema");
const getTripHandler = async (req, res) => {
    try {
        const { success: isValidTripId, data: parsedTripId, error: parsedTripIdError, } = Schema_1.IdSchema.safeParse(req.params);
        if (!isValidTripId || !parsedTripId) {
            console.error(parsedTripIdError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid User id " + parsedTripIdError);
        }
        const TripId = parsedTripId.tripid;
        const trip = await (0, query_1.getTripById)(TripId);
        if (!trip)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Trip not found");
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Trip fetched", data: trip });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError) {
            return res.status(error.status).json({ success: false, message: error.message });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.getTripHandler = getTripHandler;
//# sourceMappingURL=getTrip.js.map