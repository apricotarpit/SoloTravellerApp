"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const httpResponse_1 = require("../utils/httpResponse");
const Schema_1 = require("./Schema");
const jwt_1 = require("./jwt");
const query_1 = require("./query");
const changePasswordHandler = async (req, res) => {
    try {
        const token = (0, jwt_1.extractToken)(req);
        if (!token) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        }
        const { success: isValidRequestBody, data: parsedRequestBody, error: parsedRequestBodyError, } = Schema_1.ChangePasswordSchema.safeParse(req.body);
        if (!isValidRequestBody || !parsedRequestBody) {
            console.error(parsedRequestBodyError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body" + parsedRequestBodyError);
        }
        const decodedToken = (0, jwt_1.verifyAuthToken)(token);
        const user = await (0, query_1.findUserByIdWithPassword)(decodedToken.userId);
        if (!user) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
        }
        const isOldPasswordValid = await bcrypt_1.default.compare(parsedRequestBody.oldPassword, user.password);
        if (!isOldPasswordValid) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Old password is incorrect");
        }
        const hashedNewPassword = await bcrypt_1.default.hash(parsedRequestBody.newPassword, 10);
        const updatedUser = await (0, query_1.updateUserPassword)(user.id, hashedNewPassword);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Password changed successfully",
            data: updatedUser,
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
exports.changePasswordHandler = changePasswordHandler;
//# sourceMappingURL=changePassword.js.map