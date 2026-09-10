"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewVerificationHandler = exports.getPendingVerificationsHandler = exports.getVerificationStatusHandler = exports.submitVerificationHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const submitVerificationHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.submitVerificationHandler = submitVerificationHandler;
const getVerificationStatusHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.getVerificationStatusHandler = getVerificationStatusHandler;
const getPendingVerificationsHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.getPendingVerificationsHandler = getPendingVerificationsHandler;
const reviewVerificationHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.reviewVerificationHandler = reviewVerificationHandler;
//# sourceMappingURL=handlers.js.map