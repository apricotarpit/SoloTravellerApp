"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondTripInviteHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../auth/jwt");
const httpResponse_1 = require("../utils/httpResponse");
const Schema_1 = require("./Schema");
const query_1 = require("./query");
const respondTripInviteHandler = async (req, res) => {
    try {
        const { success: isValidRequestBody, data: parsedRequestBody, error: parsedRequestBodyError, } = Schema_1.RespondInviteSchema.safeParse(req.body);
        if (!isValidRequestBody || !parsedRequestBody) {
            console.error(parsedRequestBodyError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body" + parsedRequestBodyError);
        }
        const token = (0, jwt_1.extractToken)(req);
        if (!token)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        const userId = (0, jwt_1.verifyAuthToken)(token).userId;
        const parseInviteId = (value, name) => {
            const normalizedValue = Array.isArray(value) ? value[0] : value;
            const id = Number(normalizedValue);
            if (!Number.isInteger(id) || id <= 0) {
                throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, `Invalid ${name} id`);
            }
            return id;
        };
        const inviteId = parseInviteId(req.params.id, "invite");
        const invite = await (0, query_1.findInviteById)(inviteId);
        if (!invite)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Trip invite not found");
        if (invite.receiverId !== userId) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "Only the invite receiver can respond");
        }
        if (invite.status !== "PENDING") {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.CONFLICT, "This trip invite has already been handled");
        }
        const updated = await (0, query_1.updateInviteStatus)(inviteId, parsedRequestBody.status);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Trip invite updated", data: updated });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.respondTripInviteHandler = respondTripInviteHandler;
//# sourceMappingURL=respondTripInvite.js.map