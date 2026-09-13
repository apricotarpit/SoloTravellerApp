import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { findTripById, getMatchRequestsByTripId } from "./query";
import { IdSchema } from "../trip/Schema";

export const getMatchRequestsHandler = async (req: Request, res: Response) => {
  try {
    const {
      success: isValidTripId,
      data: parsedTripId,
      error: parsedTripIdError,
    } = IdSchema.safeParse(req.params);
            
    if (!isValidTripId || !parsedTripId) {
      console.error(parsedTripIdError);
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid trip id " + parsedTripIdError);
    }
    const TripId = parsedTripId.tripid;
    const trip = await findTripById(TripId);

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
    
    const userId = verifyAuthToken(token).userId;;

    if (!trip) throw new HttpError(StatusCodes.NOT_FOUND, "Trip not found");
    if (trip.userId !== userId) {
      throw new HttpError(StatusCodes.FORBIDDEN, "Only the trip owner can view match requests");
    }

    const requests = await getMatchRequestsByTripId(TripId);
    return res.status(StatusCodes.OK).json({ success: true, message: "Match requests fetched", data: requests });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
