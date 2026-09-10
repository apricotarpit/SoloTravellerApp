import { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { getInviteUserId } from "./auth";
import { getReceivedInvites } from "./query";

export const getReceivedInvitesHandler = async (req: Request, res: Response) => {
  try {
    const userId = getInviteUserId(req);
    const invites = await getReceivedInvites(userId);

    return res.status(StatusCodes.OK).json({ success: true, message: "Received trip invites fetched", data: invites });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
