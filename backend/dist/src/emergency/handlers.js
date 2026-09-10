"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmergencyContactHandler = exports.updateEmergencyContactHandler = exports.getEmergencyContactsHandler = exports.createEmergencyContactHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const createEmergencyContactHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.createEmergencyContactHandler = createEmergencyContactHandler;
const getEmergencyContactsHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.getEmergencyContactsHandler = getEmergencyContactsHandler;
const updateEmergencyContactHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.updateEmergencyContactHandler = updateEmergencyContactHandler;
const deleteEmergencyContactHandler = async (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
exports.deleteEmergencyContactHandler = deleteEmergencyContactHandler;
//# sourceMappingURL=handlers.js.map