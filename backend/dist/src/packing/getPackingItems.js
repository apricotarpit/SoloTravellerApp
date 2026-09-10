"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackingItemsHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const auth_1 = require("./auth");
const query_1 = require("./query");
const getPackingItemsHandler = async (req, res) => {
    try {
        const userId = (0, auth_1.getPackingUserId)(req);
        const listId = (0, auth_1.parseResourceId)(req.params.listId, "packing list");
        const list = await (0, query_1.getPackingListById)(listId, userId);
        if (!list)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Packing list not found");
        const items = await (0, query_1.getPackingItemsByListId)(listId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Packing items fetched", data: items });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.getPackingItemsHandler = getPackingItemsHandler;
//# sourceMappingURL=getPackingItems.js.map