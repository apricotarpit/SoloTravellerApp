"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessageHandler = exports.updateMessageStatusHandler = exports.sendMessageHandler = exports.getChatMessagesHandler = exports.getUserChatsHandler = exports.createChatHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const createChatHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.createChatHandler = createChatHandler;
const getUserChatsHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.getUserChatsHandler = getUserChatsHandler;
const getChatMessagesHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.getChatMessagesHandler = getChatMessagesHandler;
const sendMessageHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.sendMessageHandler = sendMessageHandler;
const updateMessageStatusHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.updateMessageStatusHandler = updateMessageStatusHandler;
const deleteMessageHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.deleteMessageHandler = deleteMessageHandler;
//# sourceMappingURL=handlers.js.map