import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { getMatchingUserId, parseMatchingId } from "./auth";
import { RespondMatchRequestSchema } from "./Schema";
import { findMatchRequestById, updateMatchRequestStatus } from "./query";

export const respondMatchRequestHandler = async (req: Request, res: Response) => {
  try {
    const parsed = RespondMatchRequestSchema.safeParse(req.body);
    if (!parsed.success) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid request body");

    const userId = getMatchingUserId(req);
    const requestId = parseMatchingId(req.params.id, "match request");
    const matchRequest = await findMatchRequestById(requestId);

    if (!matchRequest) throw new HttpError(StatusCodes.NOT_FOUND, "Match request not found");
    if (matchRequest.receiverId !== userId) {
      throw new HttpError(StatusCodes.FORBIDDEN, "Only the receiver can respond to this match request");
    }
    if (matchRequest.status !== "PENDING") {
      throw new HttpError(StatusCodes.CONFLICT, "This match request has already been handled");
    }

    const updated = await updateMatchRequestStatus(requestId, parsed.data.status);
    return res.status(StatusCodes.OK).json({ success: true, message: "Match request updated", data: updated });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
