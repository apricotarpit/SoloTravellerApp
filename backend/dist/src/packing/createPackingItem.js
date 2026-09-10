"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPackingItemHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const auth_1 = require("./auth");
const Schema_1 = require("./Schema");
const query_1 = require("./query");
const createPackingItemHandler = async (req, res) => {
    try {
        const parsed = Schema_1.CreatePackingItemSchema.safeParse(req.body);
        if (!parsed.success)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid request body");
        const userId = (0, auth_1.getPackingUserId)(req);
        const listId = (0, auth_1.parseResourceId)(req.params.listId, "packing list");
        const list = await (0, query_1.getPackingListById)(listId, userId);
        if (!list)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Packing list not found");
        const item = await (0, query_1.createPackingItem)({ packingListId: listId, ...parsed.data });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, message: "Packing item created", data: item });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.createPackingItemHandler = createPackingItemHandler;
//# sourceMappingURL=createPackingItem.js.map