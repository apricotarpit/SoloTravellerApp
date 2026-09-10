import { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { getInviteUserId, parseInviteId } from "./auth";
import { findTripById, getTripInvitesByTripId } from "./query";

export const getTripInvitesHandler = async (req: Request, res: Response) => {
  try {
    const userId = getInviteUserId(req);
    const tripId = parseInviteId(req.params.tripId, "trip");
    const trip = await findTripById(tripId);

    if (!trip) throw new HttpError(StatusCodes.NOT_FOUND, "Trip not found");
    if (trip.userId !== userId) {
      throw new HttpError(StatusCodes.FORBIDDEN, "Only the trip owner can view trip invites");
    }

    const invites = await getTripInvitesByTripId(tripId);
    return res.status(StatusCodes.OK).json({ success: true, message: "Trip invites fetched", data: invites });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
