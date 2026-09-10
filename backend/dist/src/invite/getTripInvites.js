"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTripInvitesHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const auth_1 = require("./auth");
const query_1 = require("./query");
const getTripInvitesHandler = async (req, res) => {
    try {
        const userId = (0, auth_1.getInviteUserId)(req);
        const tripId = (0, auth_1.parseInviteId)(req.params.tripId, "trip");
        const trip = await (0, query_1.findTripById)(tripId);
        if (!trip)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Trip not found");
        if (trip.userId !== userId) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "Only the trip owner can view trip invites");
        }
        const invites = await (0, query_1.getTripInvitesByTripId)(tripId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Trip invites fetched", data: invites });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.getTripInvitesHandler = getTripInvitesHandler;
//# sourceMappingURL=getTripInvites.js.map