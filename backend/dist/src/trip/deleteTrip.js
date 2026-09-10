"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTripHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const jwt_1 = require("../auth/jwt");
const query_1 = require("./query");
const deleteTripHandler = async (req, res) => {
    try {
        const token = (0, jwt_1.extractToken)(req);
        if (!token)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        const decoded = (0, jwt_1.verifyAuthToken)(token);
        const id = Number(req.params.id);
        if (Number.isNaN(id))
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid trip id");
        const existing = await (0, query_1.getTripById)(id);
        if (!existing)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Trip not found");
        if (existing.userId !== decoded.userId && decoded.role !== "ADMIN") {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "Not authorized to delete this trip");
        }
        await (0, query_1.deleteTrip)(id);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Trip deleted" });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError) {
            return res.status(error.status).json({ success: false, message: error.message });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.deleteTripHandler = deleteTripHandler;
//# sourceMappingURL=deleteTrip.js.map