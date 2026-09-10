"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseResourceId = exports.getPackingUserId = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../auth/jwt");
const httpResponse_1 = require("../utils/httpResponse");
const getPackingUserId = (req) => {
    const token = (0, jwt_1.extractToken)(req);
    if (!token)
        throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
    const decodedToken = (0, jwt_1.verifyAuthToken)(token);
    return decodedToken.userId;
};
exports.getPackingUserId = getPackingUserId;
const parseResourceId = (value, resourceName) => {
    const normalizedValue = Array.isArray(value) ? value[0] : value;
    const id = Number(normalizedValue);
    if (!Number.isInteger(id) || id <= 0) {
        throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, `Invalid ${resourceName} id`);
    }
    return id;
};
exports.parseResourceId = parseResourceId;
//# sourceMappingURL=auth.js.map