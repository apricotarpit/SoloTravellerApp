import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { getTripById } from "./query";
import { UpdateTripSchema,IdSchema } from "./Schema";
import { updateTrip } from "./query";

export const updateTripHandler = async (req: Request, res: Response) => {
  try {
    const {
      success: isValidTripId,
      data: parsedTripId,
      error: parsedTripIdError,
    } = IdSchema.safeParse(req.params);

    if (!isValidTripId || !parsedTripId) {
      console.error(parsedTripIdError);
      throw new HttpError(
        StatusCodes.BAD_REQUEST,"Invalid trip id " + parsedTripIdError);
    }
    const TripId = parsedTripId.tripid;

    const {
      success:isValidRequestBody,
      data: parsedRequestBody,
      error:parsedRequestBodyError,
    } = UpdateTripSchema.safeParse(req.body);
        
    if (!isValidRequestBody || !parsedRequestBody) {
      console.error(parsedRequestBodyError);            
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid request body"+ parsedRequestBodyError);
    }

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");

    const decoded = verifyAuthToken(token);

    const existing = await getTripById(TripId);
    if (!existing) throw new HttpError(StatusCodes.NOT_FOUND, "Trip not found");

    if (existing.userId !== decoded.userId && decoded.role !== "ADMIN") {
      throw new HttpError(StatusCodes.FORBIDDEN, "Not authorized to update this trip");
    }

    const payload: any = {};
    if (parsedRequestBody.destination !== undefined) payload.destination = parsedRequestBody.destination;
    if (parsedRequestBody.startDate !== undefined) payload.startDate = new Date(parsedRequestBody.startDate as string);
    if (parsedRequestBody.endDate !== undefined) payload.endDate = new Date(parsedRequestBody.endDate as string);
    if (parsedRequestBody.budget !== undefined) payload.budget = parsedRequestBody.budget;
    if (parsedRequestBody.tripType !== undefined) payload.tripType = parsedRequestBody.tripType;
    if (parsedRequestBody.description !== undefined) payload.description = parsedRequestBody.description;
    if (parsedRequestBody.status !== undefined) payload.status = parsedRequestBody.status;

    const updated = await updateTrip(TripId, payload);

    return res.status(StatusCodes.OK).json({ success: true, message: "Trip updated", data: updated });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return res.status(error.status).json({ success: false, message: error.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
