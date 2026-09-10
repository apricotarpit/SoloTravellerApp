import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { getTripById } from "./query";
import { UpdateTripSchema } from "./Schema";
import { updateTrip } from "./query";

export const updateTripHandler = async (req: Request, res: Response) => {
  try {
    const parsed = UpdateTripSchema.safeParse(req.body);
    if (!parsed.success || !parsed.data) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid request body");

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");

    const decoded = verifyAuthToken(token);

    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid trip id");

    const existing = await getTripById(id);
    if (!existing) throw new HttpError(StatusCodes.NOT_FOUND, "Trip not found");

    if (existing.userId !== decoded.userId && decoded.role !== "ADMIN") {
      throw new HttpError(StatusCodes.FORBIDDEN, "Not authorized to update this trip");
    }

    const payload: any = {};
    if (parsed.data.destination !== undefined) payload.destination = parsed.data.destination;
    if (parsed.data.startDate !== undefined) payload.startDate = new Date(parsed.data.startDate as string);
    if (parsed.data.endDate !== undefined) payload.endDate = new Date(parsed.data.endDate as string);
    if (parsed.data.budget !== undefined) payload.budget = parsed.data.budget;
    if (parsed.data.tripType !== undefined) payload.tripType = parsed.data.tripType;
    if (parsed.data.description !== undefined) payload.description = parsed.data.description;
    if (parsed.data.status !== undefined) payload.status = parsed.data.status;

    const updated = await updateTrip(id, payload);

    return res.status(StatusCodes.OK).json({ success: true, message: "Trip updated", data: updated });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return res.status(error.status).json({ success: false, message: error.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
