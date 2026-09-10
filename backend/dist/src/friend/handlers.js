"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelFriendRequestHandler = exports.respondFriendRequestHandler = exports.getSentFriendRequestsHandler = exports.getReceivedFriendRequestsHandler = exports.sendFriendRequestHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const sendFriendRequestHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.sendFriendRequestHandler = sendFriendRequestHandler;
const getReceivedFriendRequestsHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.getReceivedFriendRequestsHandler = getReceivedFriendRequestsHandler;
const getSentFriendRequestsHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.getSentFriendRequestsHandler = getSentFriendRequestsHandler;
const respondFriendRequestHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.respondFriendRequestHandler = respondFriendRequestHandler;
const cancelFriendRequestHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.cancelFriendRequestHandler = cancelFriendRequestHandler;
//# sourceMappingURL=handlers.js.map