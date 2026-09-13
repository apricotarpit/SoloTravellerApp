"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const Schema_1 = require("../auth/Schema");
const jwt_1 = require("../auth/jwt");
const query_1 = require("../auth/query");
const updateProfileHandler = async (req, res) => {
    try {
        const { success: isValidRequestBody, data: parsedRequestBody, error: parsedRequestBodyError, } = Schema_1.UpdateProfileSchema.safeParse(req.body);
        if (!isValidRequestBody || !parsedRequestBody) {
            console.error(parsedRequestBodyError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body" + parsedRequestBodyError);
        }
        const token = (0, jwt_1.extractToken)(req);
        if (!token) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        }
        if (Object.keys(parsedRequestBody).length === 0) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "At least one field is required");
        }
        const decodedToken = (0, jwt_1.verifyAuthToken)(token);
        const user = await (0, query_1.findUserById)(decodedToken.userId);
        if (!user) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
        }
        const updatedUser = await (0, query_1.updateUserProfile)(decodedToken.userId, parsedRequestBody);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Profile updated successfully",
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
exports.updateProfileHandler = updateProfileHandler;
//# sourceMappingURL=updateprofile.js.map