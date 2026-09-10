"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterUsersHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const query_1 = require("../auth/query");
const jwt_1 = require("../auth/jwt");
const Schema_1 = require("./Schema");
const filterUsersHandler = async (req, res) => {
    try {
        const { success: isValidRequestQuery, data: parsedRequestQuery, error: parsedRequestQueryError, } = Schema_1.UserFilterQuerySchema.safeParse(req.query);
        if (!isValidRequestQuery || !parsedRequestQuery) {
            console.error("Validation Error", parsedRequestQueryError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request Query");
        }
        const token = (0, jwt_1.extractToken)(req);
        if (!token) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        }
        const decodedToken = (0, jwt_1.verifyAuthToken)(token);
        const loggedInUser = await (0, query_1.findUserById)(decodedToken.userId);
        if (!loggedInUser) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Logged in user not found");
        }
        const isAdmin = loggedInUser.role === "ADMIN";
        const { users, totalCount } = await (0, query_1.filterUsers)({
            excludeUserId: isAdmin ? undefined : loggedInUser.id,
            city: parsedRequestQuery.city,
            profession: parsedRequestQuery.profession,
            gender: parsedRequestQuery.gender,
            role: parsedRequestQuery.role,
            isActive: parsedRequestQuery.isActive,
            limit: parsedRequestQuery.limit,
            offset: parsedRequestQuery.offset,
        });
        const responseBody = {
            total: totalCount > parsedRequestQuery.limit
                ? Math.ceil(totalCount / parsedRequestQuery.limit)
                : 1,
            limit: parsedRequestQuery.limit,
            offset: parsedRequestQuery.offset,
            data: users,
        };
        const response = Schema_1.paginatedUsersResponseSchema.parse(responseBody);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Users filtered successfully",
            data: response,
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError) {
            return res.status(error.status).json({ success: false, message: error.message, });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
        });
    }
};
exports.filterUsersHandler = filterUsersHandler;
//# sourceMappingURL=filterusers.js.map