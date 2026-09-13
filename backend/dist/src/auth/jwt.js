"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractToken = exports.verifyAuthToken = exports.createAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const createAuthToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.default.JWT_SECRET, {
        expiresIn: config_1.default.JWT_EXPIRES_IN,
    });
};
exports.createAuthToken = createAuthToken;
const verifyAuthToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
};
exports.verifyAuthToken = verifyAuthToken;
const extractToken = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
        return authHeader.slice(7);
    }
    return null;
};
exports.extractToken = extractToken;
//# sourceMappingURL=jwt.js.map