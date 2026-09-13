"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEmergencyError = exports.parseContactId = exports.getAuthenticatedUserId = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../auth/jwt");
const httpResponse_1 = require("../utils/httpResponse");
const getAuthenticatedUserId = (req) => {
    const token = (0, jwt_1.extractToken)(req);
    if (!token)
        throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
    return (0, jwt_1.verifyAuthToken)(token).userId;
};
exports.getAuthenticatedUserId = getAuthenticatedUserId;
const parseContactId = (value) => {
    const normalizedValue = Array.isArray(value) ? value[0] : value;
    const id = Number(normalizedValue);
    if (!Number.isInteger(id) || id <= 0)
        throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid emergency contact id");
    return id;
};
exports.parseContactId = parseContactId;
const handleEmergencyError = (error, res) => {
    console.error(error);
    if (error instanceof httpResponse_1.HttpError)
        return res.status(error.status).json({ success: false, message: error.message });
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
};
exports.handleEmergencyError = handleEmergencyError;
//# sourceMappingURL=helpers.js.map