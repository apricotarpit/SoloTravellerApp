import { Request, Response } from "express";
import { StatusCodes,getReasonPhrase } from "http-status-codes";
import { HttpError } from "../utils/httpResponse";
import { findEmergencyContactById } from "./query";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { parseContactId } from "./Schema";

export const getEmergencyContactHandler = async (req: Request, res: Response) => {
  try {
    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
    const userid =verifyAuthToken(token).userId;

    const contact = await findEmergencyContactById(parseContactId(req.params.id));
    if (!contact) throw new HttpError(StatusCodes.NOT_FOUND, "Emergency contact not found");
    if (contact.userId !== userid) throw new HttpError(StatusCodes.FORBIDDEN, "You can only delete your own emergency contacts");

    return res.status(StatusCodes.OK).json({ success: true, message: "Emergency contacts fetched", data: contact });
  } 
  catch (error) {
      console.error(error);
          if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};
