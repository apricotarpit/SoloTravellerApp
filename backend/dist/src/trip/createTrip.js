"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTripHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const jwt_1 = require("../auth/jwt");
const query_1 = require("../auth/query");
const Schema_1 = require("./Schema");
const query_2 = require("./query");
const createTripHandler = async (req, res) => {
    try {
        const { success: isValidRequestBody, data: parsedRequestBody, error: parsedRequestBodyError, } = Schema_1.CreateTripSchema.safeParse(req.body);
        if (!isValidRequestBody || !parsedRequestBody) {
            console.error(parsedRequestBodyError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body" + parsedRequestBodyError);
        }
        const token = (0, jwt_1.extractToken)(req);
        if (!token)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        const decoded = (0, jwt_1.verifyAuthToken)(token);
        const user = await (0, query_1.findUserById)(decoded.userId);
        if (!user)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Logged in user not found");
        const body = parsedRequestBody;
        const created = await (0, query_2.createTrip)({
            userId: decoded.userId,
            destination: body.destination,
            startDate: new Date(body.startDate),
            endDate: new Date(body.endDate),
            budget: body.budget ?? null,
            tripType: body.tripType ?? null,
            description: body.description ?? null,
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, message: "Trip created", data: created });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError) {
            return res.status(error.status).json({ success: false, message: error.message });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.createTripHandler = createTripHandler;
//# sourceMappingURL=createTrip.js.map