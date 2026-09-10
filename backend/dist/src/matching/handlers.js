"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondMatchRequestHandler = exports.getMatchRequestsHandler = exports.createMatchRequestHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const createMatchRequestHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.createMatchRequestHandler = createMatchRequestHandler;
const getMatchRequestsHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.getMatchRequestsHandler = getMatchRequestsHandler;
const respondMatchRequestHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.respondMatchRequestHandler = respondMatchRequestHandler;
//# sourceMappingURL=handlers.js.map