import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { findUserById } from "../auth/query";
import { CreateTripSchema } from "./Schema";
import { createTrip } from "./query";

export const createTripHandler = async (req: Request, res: Response) => {
  try {
    const parsed = CreateTripSchema.safeParse(req.body);
    if (!parsed.success || !parsed.data) {
      throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid request body");
    }

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");

    const decoded = verifyAuthToken(token);
    const user = await findUserById(decoded.userId);
    if (!user) throw new HttpError(StatusCodes.UNAUTHORIZED, "Logged in user not found");

    const body = parsed.data;
    const created = await createTrip({
      userId: decoded.userId,
      destination: body.destination,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      budget: body.budget ?? null,
      tripType: body.tripType ?? null,
      description: body.description ?? null,
    });

    return res.status(StatusCodes.CREATED).json({ success: true, message: "Trip created", data: created });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return res.status(error.status).json({ success: false, message: error.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
