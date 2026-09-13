import { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { getReceivedInvites } from "./query";

export const getReceivedInvitesHandler = async (req: Request, res: Response) => {
  try {

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
    const userId = verifyAuthToken(token).userId;

    const parseInviteId = (value: string | string[] | undefined, name: string) => {
    const normalizedValue = Array.isArray(value) ? value[0] : value;
      const id = Number(normalizedValue);
      if (!Number.isInteger(id) || id <= 0) {
        throw new HttpError(StatusCodes.BAD_REQUEST, `Invalid ${name} id`);
      }

      return id;
    };
    const invites = await getReceivedInvites(userId);

    return res.status(StatusCodes.OK).json({ success: true, message: "Received trip invites fetched", data: invites });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
