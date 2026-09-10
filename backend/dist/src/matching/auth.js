"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMatchingId = exports.getMatchingUserId = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../auth/jwt");
const httpResponse_1 = require("../utils/httpResponse");
const getMatchingUserId = (req) => {
    const token = (0, jwt_1.extractToken)(req);
    if (!token)
        throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
    return (0, jwt_1.verifyAuthToken)(token).userId;
};
exports.getMatchingUserId = getMatchingUserId;
const parseMatchingId = (value, name) => {
    const normalizedValue = Array.isArray(value) ? value[0] : value;
    const id = Number(normalizedValue);
    if (!Number.isInteger(id) || id <= 0) {
        throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, `Invalid ${name} id`);
    }
    return id;
};
exports.parseMatchingId = parseMatchingId;
//# sourceMappingURL=auth.js.map