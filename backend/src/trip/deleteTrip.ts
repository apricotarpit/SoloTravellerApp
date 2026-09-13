import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { getTripById, deleteTrip } from "./query";
import { IdSchema } from "./Schema";

export const deleteTripHandler = async (req: Request, res: Response) => {
  try {
    const {
        success: isValidTripId,
        data: parsedTripId,
        error: parsedTripIdError,
    } = IdSchema.safeParse(req.params);
    
    if (!isValidTripId || !parsedTripId) {
        console.error(parsedTripIdError);
        throw new HttpError(
        StatusCodes.BAD_REQUEST,
        "Invalid trip id " + parsedTripIdError
        );
    }
    const TripId = parsedTripId.tripid;

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");

    const decoded = verifyAuthToken(token);

    const Trip = await getTripById(TripId);
    if (!Trip) throw new HttpError(StatusCodes.NOT_FOUND, "Trip not found");

    if (Trip.userId !== decoded.userId && decoded.role !== "ADMIN") {
      throw new HttpError(StatusCodes.FORBIDDEN, "Not authorized to delete this trip");
    }

    await deleteTrip(TripId);

    return res.status(StatusCodes.OK).json({ success: true, message: "Trip deleted" ,data: Trip});
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return res.status(error.status).json({ success: false, message: error.message});
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
