"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTripsHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const query_1 = require("./query");
const Schema_1 = require("./Schema");
const getUserTripsHandler = async (req, res) => {
    try {
        const { success: isValidUserId, data: parsedUserId, error: parsedUserIdError, } = Schema_1.UserIdSchema.safeParse(req.params);
        if (!isValidUserId || !parsedUserId) {
            console.error(parsedUserIdError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid User id " + parsedUserIdError);
        }
        const UserId = parsedUserId.userid;
        const result = await (0, query_1.getTripsByUserId)(UserId);
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