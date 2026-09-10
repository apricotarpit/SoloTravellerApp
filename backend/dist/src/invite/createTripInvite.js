"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTripInviteHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const auth_1 = require("./auth");
const Schema_1 = require("./Schema");
const query_1 = require("./query");
const createTripInviteHandler = async (req, res) => {
    try {
        const parsed = Schema_1.CreateInviteSchema.safeParse(req.body);
        if (!parsed.success)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body");
        const senderId = (0, auth_1.getInviteUserId)(req);
        const tripId = (0, auth_1.parseInviteId)(req.params.tripId, "trip");
        const { receiverId, message } = parsed.data;
        if (senderId === receiverId) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "You cannot invite yourself");
        }
        const [trip, receiver] = await Promise.all([
            (0, query_1.findTripById)(tripId),
            (0, query_1.findUserById)(receiverId),
        ]);
        if (!trip)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Trip not found");
        if (!receiver)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Receiver not found");
        if (trip.userId !== senderId) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "Only the trip owner can send invites");
        }
        if (trip.status !== "OPEN") {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invites can only be sent for open trips");
        }
        const existing = await (0, query_1.findPendingInvite)(tripId, senderId, receiverId);
        if (existing)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.CONFLICT, "A pending invite already exists");
        const invite = await (0, query_1.createTripInvite)({ tripId, senderId, receiverId, message });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, message: "Trip invite sent", data: invite });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.createTripInviteHandler = createTripInviteHandler;
//# sourceMappingURL=createTripInvite.js.map