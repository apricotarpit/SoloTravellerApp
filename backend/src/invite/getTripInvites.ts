import { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { findTripById, getTripInvitesByTripId } from "./query";

export const getTripInvitesHandler = async (req: Request, res: Response) => {
  try {

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
    const userId =verifyAuthToken(token).userId;

    const parseInviteId = (value: string | string[] | undefined, name: string) => {
      const normalizedValue = Array.isArray(value) ? value[0] : value;
      const id = Number(normalizedValue);
      if (!Number.isInteger(id) || id <= 0) {
        throw new HttpError(StatusCodes.BAD_REQUEST, `Invalid ${name} id`);
      }
      return id;
    };
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
