"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondMatchRequestHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const auth_1 = require("./auth");
const Schema_1 = require("./Schema");
const query_1 = require("./query");
const respondMatchRequestHandler = async (req, res) => {
    try {
        const parsed = Schema_1.RespondMatchRequestSchema.safeParse(req.body);
        if (!parsed.success)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body");
        const userId = (0, auth_1.getMatchingUserId)(req);
        const requestId = (0, auth_1.parseMatchingId)(req.params.id, "match request");
        const matchRequest = await (0, query_1.findMatchRequestById)(requestId);
        if (!matchRequest)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Match request not found");
        if (matchRequest.receiverId !== userId) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "Only the receiver can respond to this match request");
        }
        if (matchRequest.status !== "PENDING") {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.CONFLICT, "This match request has already been handled");
        }
        const updated = await (0, query_1.updateMatchRequestStatus)(requestId, parsed.data.status);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Match request updated", data: updated });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.respondMatchRequestHandler = respondMatchRequestHandler;
//# sourceMappingURL=respondMatchRequest.js.map