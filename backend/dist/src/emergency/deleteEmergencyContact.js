"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmergencyContactHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const query_1 = require("./query");
const helpers_1 = require("./helpers");
const httpResponse_1 = require("../utils/httpResponse");
const deleteEmergencyContactHandler = async (req, res) => {
    try {
        const contact = await (0, query_1.findEmergencyContactById)((0, helpers_1.parseContactId)(req.params.id));
        if (!contact)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Emergency contact not found");
        if (contact.userId !== (0, helpers_1.getAuthenticatedUserId)(req))
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "You can only delete your own emergency contacts");
        await (0, query_1.deleteEmergencyContact)(contact.id);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Emergency contact deleted", data: contact });
    }
    catch (error) {
        return (0, helpers_1.handleEmergencyError)(error, res);
    }
};
exports.deleteEmergencyContactHandler = deleteEmergencyContactHandler;
//# sourceMappingURL=deleteEmergencyContact.js.map