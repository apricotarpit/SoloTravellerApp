import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { getMatchingUserId, parseMatchingId } from "./auth";
import { CreateMatchRequestSchema } from "./Schema";
import {
  createMatchRequest,
  findPendingMatchRequest,
  findTripById,
  findUserById,
} from "./query";

export const createMatchRequestHandler = async (req: Request, res: Response) => {
  try {
    const parsed = CreateMatchRequestSchema.safeParse(req.body);
    if (!parsed.success) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid request body");

    const senderId = getMatchingUserId(req);
    const tripId = parseMatchingId(req.params.tripId, "trip");
    const { receiverId } = parsed.data;

    if (senderId === receiverId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, "You cannot send a match request to yourself");
    }

    const [trip, receiver] = await Promise.all([
      findTripById(tripId),
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

    const existing = await findPendingMatchRequest(senderId, receiverId, tripId);
    if (existing) throw new HttpError(StatusCodes.CONFLICT, "A pending match request already exists");

    const request = await createMatchRequest({ senderId, receiverId, tripId });
    return res.status(StatusCodes.CREATED).json({ success: true, message: "Match request sent", data: request });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
