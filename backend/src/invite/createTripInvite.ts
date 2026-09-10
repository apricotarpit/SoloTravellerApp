import { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { getInviteUserId, parseInviteId } from "./auth";
import { CreateInviteSchema } from "./Schema";
import {
  createTripInvite,
  findPendingInvite,
  findTripById,
  findUserById,
} from "./query";

export const createTripInviteHandler = async (req: Request, res: Response) => {
  try {
    const parsed = CreateInviteSchema.safeParse(req.body);
    if (!parsed.success) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid request body");

    const senderId = getInviteUserId(req);
    const tripId = parseInviteId(req.params.tripId, "trip");
    const { receiverId, message } = parsed.data;

    if (senderId === receiverId) {
      throw new HttpError(StatusCodes.BAD_REQUEST, "You cannot invite yourself");
    }

    const [trip, receiver] = await Promise.all([
      findTripById(tripId),
      findUserById(receiverId),
    ]);

    if (!trip) throw new HttpError(StatusCodes.NOT_FOUND, "Trip not found");
    if (!receiver) throw new HttpError(StatusCodes.NOT_FOUND, "Receiver not found");
    if (trip.userId !== senderId) {
      throw new HttpError(StatusCodes.FORBIDDEN, "Only the trip owner can send invites");
    }
    if (trip.status !== "OPEN") {
      throw new HttpError(StatusCodes.BAD_REQUEST, "Invites can only be sent for open trips");
    }

    const existing = await findPendingInvite(tripId, senderId, receiverId);
    if (existing) throw new HttpError(StatusCodes.CONFLICT, "A pending invite already exists");

    const invite = await createTripInvite({ tripId, senderId, receiverId, message });
    return res.status(StatusCodes.CREATED).json({ success: true, message: "Trip invite sent", data: invite });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
