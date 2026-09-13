import { Request, Response } from "express";
import { StatusCodes,getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { CreateEmergencyContactSchema } from "./Schema";
import { createEmergencyContact } from "./query";
import { extractToken, verifyAuthToken } from "../auth/jwt";

export const createEmergencyContactHandler = async (req: Request, res: Response) => {
  try {
    const {
      success: isValidrequestBody,
      data: parsedrequestBody,
      error: parsedrequestBodyError,
    } = CreateEmergencyContactSchema.safeParse(req.body);
            
    if (!isValidrequestBody || !parsedrequestBody) {
      console.error(parsedrequestBodyError);
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid trip id " + parsedrequestBodyError);
    }

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
    const userid = verifyAuthToken(token).userId;
    
    const contact = await createEmergencyContact({ userId:userid, ...parsedrequestBody });

    return res.status(StatusCodes.CREATED).json({ success: true, message: "Emergency contact created", data: contact });
  } 
  catch (error) {
    console.error(error);
        if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
