"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmergencyContactHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const Schema_1 = require("./Schema");
const query_1 = require("./query");
const helpers_1 = require("./helpers");
const updateEmergencyContactHandler = async (req, res) => {
    try {
        const parsed = Schema_1.UpdateEmergencyContactSchema.safeParse(req.body);
        if (!parsed.success)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid emergency contact data");
        const contact = await (0, query_1.findEmergencyContactById)((0, helpers_1.parseContactId)(req.params.id));
        if (!contact)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Emergency contact not found");
        if (contact.userId !== (0, helpers_1.getAuthenticatedUserId)(req))
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "You can only update your own emergency contacts");
        const updated = await (0, query_1.updateEmergencyContact)(contact.id, parsed.data);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Emergency contact updated", data: updated });
    }
    catch (error) {
        return (0, helpers_1.handleEmergencyError)(error, res);
    }
};
exports.updateEmergencyContactHandler = updateEmergencyContactHandler;
//# sourceMappingURL=updateEmergencyContact.js.map