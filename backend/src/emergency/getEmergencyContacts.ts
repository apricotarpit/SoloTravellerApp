import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { getEmergencyContactsByUserId } from "./query";
import { getAuthenticatedUserId, handleEmergencyError } from "./helpers";

export const getEmergencyContactsHandler = async (req: Request, res: Response) => {
  try {
    const contacts = await getEmergencyContactsByUserId(getAuthenticatedUserId(req));
    return res.status(StatusCodes.OK).json({ success: true, message: "Emergency contacts fetched", data: contacts });
  } catch (error) {
    return handleEmergencyError(error, res);
  }
};
