"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackingListHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const jwt_1 = require("../auth/jwt");
const Schema_1 = require("./Schema");
const query_1 = require("./query");
const updatePackingListHandler = async (req, res) => {
    try {
        const parsed = Schema_1.UpdatePackingListSchema.safeParse(req.body);
        if (!parsed.success)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body");
        const token = (0, jwt_1.extractToken)(req);
        if (!token)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        const { userId } = (0, jwt_1.verifyAuthToken)(token);
        const listId = Number(req.params.id);
        if (!Number.isInteger(listId) || listId <= 0)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid packing list id");
        const updated = await (0, query_1.updatePackingList)(listId, userId, {
            name: parsed.data.name,
            destination: parsed.data.destination,
            startDate: parsed.data.startDate === undefined ? undefined : parsed.data.startDate === null ? null : new Date(parsed.data.startDate),
            endDate: parsed.data.endDate === undefined ? undefined : parsed.data.endDate === null ? null : new Date(parsed.data.endDate),
            items: parsed.data.items,
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