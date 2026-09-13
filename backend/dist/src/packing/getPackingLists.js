"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackingListsHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const jwt_1 = require("../auth/jwt");
const query_1 = require("./query");
const getPackingListsHandler = async (req, res) => {
    try {
        const token = (0, jwt_1.extractToken)(req);
        if (!token)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
        const { userId } = (0, jwt_1.verifyAuthToken)(token);
        const lists = await (0, query_1.getPackingListsByUserId)(userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Packing lists fetched", data: lists });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.getPackingListsHandler = getPackingListsHandler;
//# sourceMappingURL=getPackingLists.js.map