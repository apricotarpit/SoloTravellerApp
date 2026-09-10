"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTripsHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const query_1 = require("./query");
const getUserTripsHandler = async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        if (Number.isNaN(userId))
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid user id");
        const result = await (0, query_1.getTripsByUserId)(userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "User trips fetched", data: result });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError) {
            return res.status(error.status).json({ success: false, message: error.message });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.getUserTripsHandler = getUserTripsHandler;
//# sourceMappingURL=getUserTrips.js.map