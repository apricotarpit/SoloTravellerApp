import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { getMatchingUserId } from "./auth";
import { getMatchRequestsForUser } from "./query";

export const getReceivedMatchRequestsHandler = async (req: Request, res: Response) => {
  try {
    const userId = getMatchingUserId(req);
    const requests = await getMatchRequestsForUser(userId);

    return res.status(StatusCodes.OK).json({ success: true, message: "Received match requests fetched", data: requests });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
