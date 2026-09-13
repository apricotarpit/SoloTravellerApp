import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { CreateMatchRequestSchema } from "./Schema";
import {
  createMatchRequest,
  findPendingMatchRequest,
  findTripById,
  findUserById,
} from "./query";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { IdSchema } from "../trip/Schema";

export const createMatchRequestHandler = async (req: Request, res: Response) => {
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

    const {
      success:isValidRequestBody,
      data: parsedRequestBody,
      error:parsedRequestBodyError,
    } = CreateMatchRequestSchema.safeParse(req.body);
            
    if (!isValidRequestBody || !parsedRequestBody) {
      console.error(parsedRequestBodyError);            
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid request body"+ parsedRequestBodyError);
    }

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");

    const senderId=verifyAuthToken(token).userId;
    const { receiverId } = parsedRequestBody;

    if (senderId === receiverId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, "You cannot send a match request to yourself");
    }

    const [trip, receiver] = await Promise.all([
      findTripById(TripId),
      findUserById(receiverId),
    ]);

    if (!trip) throw new HttpError(StatusCodes.NOT_FOUND, "Trip not found");
    if (!receiver) throw new HttpError(StatusCodes.NOT_FOUND, "Receiver not found");
    if (trip.userId !== receiverId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, "Receiver must be the trip owner");
    }
    if (trip.status !== "OPEN") {
      throw new HttpError(StatusCodes.BAD_REQUEST, "Match requests can only be sent for open trips");
    }

    const existing = await findPendingMatchRequest(senderId, receiverId, TripId);
    if (existing) throw new HttpError(StatusCodes.CONFLICT, "A pending match request already exists");

    const request = await createMatchRequest({ senderId, receiverId, tripId: TripId });
    return res.status(StatusCodes.CREATED).json({ success: true, message: "Match request sent", data: request });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
