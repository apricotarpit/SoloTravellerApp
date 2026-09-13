"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmergencyContactsHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const query_1 = require("./query");
const helpers_1 = require("./helpers");
const getEmergencyContactsHandler = async (req, res) => {
    try {
        const contacts = await (0, query_1.getEmergencyContactsByUserId)((0, helpers_1.getAuthenticatedUserId)(req));
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Emergency contacts fetched", data: contacts });
    }
    catch (error) {
        return (0, helpers_1.handleEmergencyError)(error, res);
    }
};
exports.getEmergencyContactsHandler = getEmergencyContactsHandler;
//# sourceMappingURL=getEmergencyContacts.js.map