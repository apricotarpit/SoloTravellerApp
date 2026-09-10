"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackingItemHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const auth_1 = require("./auth");
const Schema_1 = require("./Schema");
const query_1 = require("./query");
const updatePackingItemHandler = async (req, res) => {
    try {
        const parsed = Schema_1.UpdatePackingItemSchema.safeParse(req.body);
        if (!parsed.success || Object.keys(parsed.data).length === 0) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "At least one valid field is required");
        }
        const userId = (0, auth_1.getPackingUserId)(req);
        const itemId = (0, auth_1.parseResourceId)(req.params.id, "packing item");
        const item = await (0, query_1.findPackingItemWithOwner)(itemId);
        if (!item || item.packingList.userId !== userId) {
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Packing item not found");
        }
        const updated = await (0, query_1.updatePackingItem)(itemId, parsed.data);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Packing item updated", data: updated });
    }
    catch (error) {
        console.error(error);
        if (error instanceof httpResponse_1.HttpError)
            return res.status(error.status).json({ success: false, message: error.message });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.updatePackingItemHandler = updatePackingItemHandler;
//# sourceMappingURL=updatePackingItem.js.map