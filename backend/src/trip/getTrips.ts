import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { getTrips } from "./query";

export const getTripsHandler = async (req: Request, res: Response) => {
  try {
    const destination = typeof req.query.destination === "string" ? req.query.destination : undefined;
    const tripType = typeof req.query.tripType === "string" ? req.query.tripType : undefined;
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const startDate = typeof req.query.startDate === "string" ? new Date(req.query.startDate) : undefined;
    const endDate = typeof req.query.endDate === "string" ? new Date(req.query.endDate) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const offset = req.query.offset ? Number(req.query.offset) : 0;

    const result = await getTrips({ destination, tripType, status, startDate, endDate, limit, offset });

    return res.status(StatusCodes.OK).json({ success: true, message: "Trips fetched", data: result });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
