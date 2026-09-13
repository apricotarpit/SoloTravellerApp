"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondMatchRequestHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const jwt_1 = require("../auth/jwt");
const Schema_1 = require("./Schema");
const query_1 = require("./query");
const Schema_2 = require("../trip/Schema");
const respondMatchRequestHandler = async (req, res) => {
    try {
        const { success: isValidId, data: parsedId, error: parsedIdError, } = Schema_2.IdSchema.safeParse(req.params);
        if (!isValidId || !parsedId) {
            console.error(parsedIdError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid trip id " + parsedIdError);
        }
        const requestId = parsedId.tripid;
        const { success: isValidRequestBody, data: parsedRequestBody, error: parsedRequestBodyError, } = Schema_1.RespondMatchRequestSchema.safeParse(req.body);
        if (!isValidRequestBody || !parsedRequestBody) {
            console.error(parsedRequestBodyError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body" + parsedRequestBodyError);
        }
        const token = (0, jwt_1.extractToken)(req);
        if (!token)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        const userId = (0, jwt_1.verifyAuthToken)(token).userId;
        const matchRequest = await (0, query_1.findMatchRequestById)(requestId);
        if (!matchRequest)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Match request not found");
        if (matchRequest.receiverId !== userId) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "Only the receiver can respond to this match request");
        }
        if (matchRequest.status !== "PENDING") {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.CONFLICT, "This match request has already been handled");
        }
        const updated = await (0, query_1.updateMatchRequestStatus)(requestId, parsedRequestBody.status);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Match request updated", data: updated });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.respondMatchRequestHandler = respondMatchRequestHandler;
//# sourceMappingURL=respondMatchRequest.js.map