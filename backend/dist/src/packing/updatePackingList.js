"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackingListHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const jwt_1 = require("../auth/jwt");
const Schema_1 = require("./Schema");
const Schema_2 = require("./Schema");
const query_1 = require("./query");
const updatePackingListHandler = async (req, res) => {
    try {
        const { success: isValidTripId, data: parsedTripId, error: parsedTripIdError, } = Schema_2.packingIdSchema.safeParse(req.params);
        if (!isValidTripId || !parsedTripId) {
            console.error(parsedTripIdError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid trip id " + parsedTripIdError);
        }
        const packingId = parsedTripId.id;
        const { success: isValidRequestBody, data: parsedRequestBody, error: parsedRequestBodyError, } = Schema_1.UpdatePackingListSchema.safeParse(req.body);
        if (!isValidRequestBody || !parsedRequestBody) {
            console.error(parsedRequestBodyError);
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body" + parsedRequestBodyError);
        }
        const token = (0, jwt_1.extractToken)(req);
        if (!token)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        const { userId } = (0, jwt_1.verifyAuthToken)(token);
        const updated = await (0, query_1.updatePackingList)(packingId, userId, {
            name: parsedRequestBody.name,
            destination: parsedRequestBody.destination,
            startDate: parsedRequestBody.startDate === undefined ? undefined : parsedRequestBody.startDate === null ? null : new Date(parsedRequestBody.startDate),
            endDate: parsedRequestBody.endDate === undefined ? undefined : parsedRequestBody.endDate === null ? null : new Date(parsedRequestBody.endDate),
            items: parsedRequestBody.items?.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                category: item.category,
                checked: item.checked,
            })),
        });
        if (!updated)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Packing list not found");
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Packing list updated", data: updated });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.updatePackingListHandler = updatePackingListHandler;
//# sourceMappingURL=updatePackingList.js.map