"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmergencyContactHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const httpResponse_1 = require("../utils/httpResponse");
const Schema_1 = require("./Schema");
const query_1 = require("./query");
const helpers_1 = require("./helpers");
const createEmergencyContactHandler = async (req, res) => {
    try {
        const parsed = Schema_1.CreateEmergencyContactSchema.safeParse(req.body);
        if (!parsed.success)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid emergency contact data");
        const contact = await (0, query_1.createEmergencyContact)({ userId: (0, helpers_1.getAuthenticatedUserId)(req), ...parsed.data });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, message: "Emergency contact created", data: contact });
    }
    catch (error) {
        return (0, helpers_1.handleEmergencyError)(error, res);
    }
};
exports.createEmergencyContactHandler = createEmergencyContactHandler;
//# sourceMappingURL=createEmergencyContact.js.map