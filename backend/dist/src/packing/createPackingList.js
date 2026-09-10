"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPackingListHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const jwt_1 = require("../auth/jwt");
const Schema_1 = require("./Schema");
const query_1 = require("./query");
const createPackingListHandler = async (req, res) => {
    try {
        const parsed = Schema_1.CreatePackingListSchema.safeParse(req.body);
        if (!parsed.success)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body");
        const token = (0, jwt_1.extractToken)(req);
        if (!token)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        const { userId } = (0, jwt_1.verifyAuthToken)(token);
        const created = await (0, query_1.createPackingList)({
            userId,
            name: parsed.data.name,
            destination: parsed.data.destination,
            startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : undefined,
            endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined,
            items: parsed.data.items,
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, message: "Packing list created", data: created });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.createPackingListHandler = createPackingListHandler;
//# sourceMappingURL=createPackingList.js.map