"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeUserHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const query_1 = require("./query");
const jwt_1 = require("./jwt");
const activeUserHandler = async (req, res) => {
    try {
        const token = (0, jwt_1.extractToken)(req);
        if (!token) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        }
        const decodedToken = (0, jwt_1.verifyAuthToken)(token);
        const user = await (0, query_1.findUserById)(decodedToken.userId);
        if (!user) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Active user fetched successfully",
            data: {
                user,
                token,
            },
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError) {
            return res.status(error.status).json({
                success: false,
                message: error.message,
            });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
        });
    }
};
exports.activeUserHandler = activeUserHandler;
//# sourceMappingURL=activeUser.js.map