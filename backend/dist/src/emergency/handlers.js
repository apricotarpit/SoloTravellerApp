"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmergencyContactHandler = exports.updateEmergencyContactHandler = exports.getEmergencyContactsHandler = exports.createEmergencyContactHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../auth/jwt");
const httpResponse_1 = require("../utils/httpResponse");
const Schema_1 = require("./Schema");
const query_1 = require("./query");
const getAuthenticatedUserId = (req) => {
    const token = (0, jwt_1.extractToken)(req);
    if (!token)
        throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Token is required");
    return (0, jwt_1.verifyAuthToken)(token).userId;
};
const parseContactId = (value) => {
    const normalizedValue = Array.isArray(value) ? value[0] : value;
    const id = Number(normalizedValue);
    if (!Number.isInteger(id) || id <= 0)
        throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid emergency contact id");
    return id;
};
const createEmergencyContactHandler = async (req, res) => {
    try {
        const parsed = Schema_1.CreateEmergencyContactSchema.safeParse(req.body);
        if (!parsed.success)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid emergency contact data");
        const contact = await (0, query_1.createEmergencyContact)({ userId: getAuthenticatedUserId(req), ...parsed.data });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ success: true, message: "Emergency contact created", data: contact });
    }
    catch (error) {
        return handleEmergencyError(error, res);
    }
};
exports.createEmergencyContactHandler = createEmergencyContactHandler;
const getEmergencyContactsHandler = async (req, res) => {
    try {
        const contacts = await (0, query_1.getEmergencyContactsByUserId)(getAuthenticatedUserId(req));
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Emergency contacts fetched", data: contacts });
    }
    catch (error) {
        return handleEmergencyError(error, res);
    }
};
exports.getEmergencyContactsHandler = getEmergencyContactsHandler;
const updateEmergencyContactHandler = async (req, res) => {
    try {
        const parsed = Schema_1.UpdateEmergencyContactSchema.safeParse(req.body);
        if (!parsed.success)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid emergency contact data");
        const contact = await (0, query_1.findEmergencyContactById)(parseContactId(req.params.id));
        if (!contact)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Emergency contact not found");
        if (contact.userId !== getAuthenticatedUserId(req))
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "You can only update your own emergency contacts");
        const updated = await (0, query_1.updateEmergencyContact)(contact.id, parsed.data);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Emergency contact updated", data: updated });
    }
    catch (error) {
        return handleEmergencyError(error, res);
    }
};
exports.updateEmergencyContactHandler = updateEmergencyContactHandler;
const deleteEmergencyContactHandler = async (req, res) => {
    try {
        const contact = await (0, query_1.findEmergencyContactById)(parseContactId(req.params.id));
        if (!contact)
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.NOT_FOUND, "Emergency contact not found");
        if (contact.userId !== getAuthenticatedUserId(req))
            throw new httpResponse_1.HttpError(http_status_codes_1.StatusCodes.FORBIDDEN, "You can only delete your own emergency contacts");
        await (0, query_1.deleteEmergencyContact)(contact.id);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Emergency contact deleted", data: contact });
    }
    catch (error) {
        return handleEmergencyError(error, res);
    }
};
exports.deleteEmergencyContactHandler = deleteEmergencyContactHandler;
const handleEmergencyError = (error, res) => {
    console.error(error);
    if (error instanceof httpResponse_1.HttpError)
        return res.status(error.status).json({ success: false, message: error.message });
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
};
//# sourceMappingURL=handlers.js.map