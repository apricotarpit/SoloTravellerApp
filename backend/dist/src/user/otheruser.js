"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otherUserHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const query_1 = require("../auth/query");
const jwt_1 = require("../auth/jwt");
const otherUserHandler = async (req, res) => {
    try {
        const token = (0, jwt_1.extractToken)(req);
        if (!token) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        }
        const decodedToken = (0, jwt_1.verifyAuthToken)(token);
        const loggedInUser = await (0, query_1.findUserById)(decodedToken.userId);
        if (!loggedInUser) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Logged in user not found");
        }
        const userId = Number(req.params.id);
        const user = await (0, query_1.findUserById)(userId);
        if (!user) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "User fetched successfully",
            data: user,
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
exports.otherUserHandler = otherUserHandler;
//# sourceMappingURL=otheruser.js.map