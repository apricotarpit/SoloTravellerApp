import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { HttpError } from "../utils/httpResponse";
import { getTripById } from "./query";
import { IdSchema } from "./Schema";

export const getTripHandler = async (req: Request, res: Response) => {
  try {
    const {
      success: isValidTripId,
      data: parsedTripId,
      error: parsedTripIdError,
    } = IdSchema.safeParse(req.params);
            
    if (!isValidTripId || !parsedTripId) {
      console.error(parsedTripIdError);
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid User id " + parsedTripIdError);
    }
    const TripId = parsedTripId.tripid;

    const trip = await getTripById(TripId);
    if (!trip) throw new HttpError(StatusCodes.NOT_FOUND, "Trip not found");

    return res.status(StatusCodes.OK).json({ success: true, message: "Trip fetched", data: trip });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return res.status(error.status).json({ success: false, message: error.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
