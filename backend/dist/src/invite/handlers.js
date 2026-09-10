"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondTripInviteHandler = exports.getTripInvitesHandler = exports.createTripInviteHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const createTripInviteHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.createTripInviteHandler = createTripInviteHandler;
const getTripInvitesHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.getTripInvitesHandler = getTripInvitesHandler;
const respondTripInviteHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.respondTripInviteHandler = respondTripInviteHandler;
//# sourceMappingURL=handlers.js.map