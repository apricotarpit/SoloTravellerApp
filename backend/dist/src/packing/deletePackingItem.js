"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePackingItemHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const auth_1 = require("./auth");
const query_1 = require("./query");
const deletePackingItemHandler = async (req, res) => {
    try {
        const userId = (0, auth_1.getPackingUserId)(req);
        const itemId = (0, auth_1.parseResourceId)(req.params.id, "packing item");
        const item = await (0, query_1.findPackingItemWithOwner)(itemId);
        if (!item || item.packingList.userId !== userId) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Packing item not found");
        }
        await (0, query_1.deletePackingItem)(itemId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Packing item deleted" });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.deletePackingItemHandler = deletePackingItemHandler;
//# sourceMappingURL=deletePackingItem.js.map