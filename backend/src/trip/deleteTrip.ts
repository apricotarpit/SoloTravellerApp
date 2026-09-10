import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { getTripById, deleteTrip } from "./query";

export const deleteTripHandler = async (req: Request, res: Response) => {
  try {
    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");

    const decoded = verifyAuthToken(token);

    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid trip id");

    const existing = await getTripById(id);
    if (!existing) throw new HttpError(StatusCodes.NOT_FOUND, "Trip not found");

    if (existing.userId !== decoded.userId && decoded.role !== "ADMIN") {
      throw new HttpError(StatusCodes.FORBIDDEN, "Not authorized to delete this trip");
    }

    await deleteTrip(id);

    return res.status(StatusCodes.OK).json({ success: true, message: "Trip deleted" });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return res.status(error.status).json({ success: false, message: error.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
