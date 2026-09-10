import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { getMatchingUserId, parseMatchingId } from "./auth";
import { findTripById, getMatchRequestsByTripId } from "./query";

export const getMatchRequestsHandler = async (req: Request, res: Response) => {
  try {
    const userId = getMatchingUserId(req);
    const tripId = parseMatchingId(req.params.tripId, "trip");
    const trip = await findTripById(tripId);

    if (!trip) throw new HttpError(StatusCodes.NOT_FOUND, "Trip not found");
    if (trip.userId !== userId) {
      throw new HttpError(StatusCodes.FORBIDDEN, "Only the trip owner can view match requests");
    }

    const requests = await getMatchRequestsByTripId(tripId);
    return res.status(StatusCodes.OK).json({ success: true, message: "Match requests fetched", data: requests });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
