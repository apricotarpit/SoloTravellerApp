"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTripsHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const query_1 = require("./query");
const getTripsHandler = async (req, res) => {
    try {
        const destination = typeof req.query.destination === "string" ? req.query.destination : undefined;
        const tripType = typeof req.query.tripType === "string" ? req.query.tripType : undefined;
        const status = typeof req.query.status === "string" ? req.query.status : undefined;
        const startDate = typeof req.query.startDate === "string" ? new Date(req.query.startDate) : undefined;
        const endDate = typeof req.query.endDate === "string" ? new Date(req.query.endDate) : undefined;
        const limit = req.query.limit ? Number(req.query.limit) : 20;
        const offset = req.query.offset ? Number(req.query.offset) : 0;
        const result = await (0, query_1.getTrips)({ destination, tripType, status, startDate, endDate, limit, offset });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, message: "Trips fetched", data: result });
    }
    catch (error) {
        console.error(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
exports.getTripsHandler = getTripsHandler;
//# sourceMappingURL=getTrips.js.map