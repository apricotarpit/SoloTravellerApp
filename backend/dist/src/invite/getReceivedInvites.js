"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReceivedInvitesHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const auth_1 = require("./auth");
const query_1 = require("./query");
const getReceivedInvitesHandler = async (req, res) => {
    try {
        const userId = (0, auth_1.getInviteUserId)(req);
        const invites = await (0, query_1.getReceivedInvites)(userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Received trip invites fetched", data: invites });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.getReceivedInvitesHandler = getReceivedInvitesHandler;
//# sourceMappingURL=getReceivedInvites.js.map