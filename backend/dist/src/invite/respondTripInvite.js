"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondTripInviteHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const auth_1 = require("./auth");
const Schema_1 = require("./Schema");
const query_1 = require("./query");
const respondTripInviteHandler = async (req, res) => {
    try {
        const parsed = Schema_1.RespondInviteSchema.safeParse(req.body);
        if (!parsed.success)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body");
        const userId = (0, auth_1.getInviteUserId)(req);
        const inviteId = (0, auth_1.parseInviteId)(req.params.id, "invite");
        const invite = await (0, query_1.findInviteById)(inviteId);
        if (!invite)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Trip invite not found");
        if (invite.receiverId !== userId) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "Only the invite receiver can respond");
        }
        if (invite.status !== "PENDING") {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.CONFLICT, "This trip invite has already been handled");
        }
        const updated = await (0, query_1.updateInviteStatus)(inviteId, parsed.data.status);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Trip invite updated", data: updated });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.respondTripInviteHandler = respondTripInviteHandler;
//# sourceMappingURL=respondTripInvite.js.map