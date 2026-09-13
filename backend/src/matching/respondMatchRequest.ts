import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { RespondMatchRequestSchema } from "./Schema";
import { findMatchRequestById, updateMatchRequestStatus } from "./query";
import { IdSchema } from "../trip/Schema";

export const respondMatchRequestHandler = async (req: Request, res: Response) => {
  try {
    const {
      success: isValidId,
      data: parsedId,
      error: parsedIdError,
    } = IdSchema.safeParse(req.params);
            
    if (!isValidId || !parsedId) {
      console.error(parsedIdError);
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid trip id " + parsedIdError);
    }
    const requestId = parsedId.tripid;

    const {
      success:isValidRequestBody,
      data: parsedRequestBody,
      error:parsedRequestBodyError,
    } = RespondMatchRequestSchema.safeParse(req.body);
                
    if (!isValidRequestBody || !parsedRequestBody) {
      console.error(parsedRequestBodyError);            
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid request body"+ parsedRequestBodyError);
    }

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
    const userId = verifyAuthToken(token).userId;

    const matchRequest = await findMatchRequestById(requestId);

    if (!matchRequest) throw new HttpError(StatusCodes.NOT_FOUND, "Match request not found");
    if (matchRequest.receiverId !== userId) {
      throw new HttpError(StatusCodes.FORBIDDEN, "Only the receiver can respond to this match request");
    }
    if (matchRequest.status !== "PENDING") {
      throw new HttpError(StatusCodes.CONFLICT, "This match request has already been handled");
    }

    const updated = await updateMatchRequestStatus(requestId, parsedRequestBody.status);
    return res.status(StatusCodes.OK).json({ success: true, message: "Match request updated", data: updated });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
