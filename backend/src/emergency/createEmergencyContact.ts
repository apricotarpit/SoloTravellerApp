import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { CreateEmergencyContactSchema } from "./Schema";
import { createEmergencyContact } from "./query";
import { getAuthenticatedUserId, handleEmergencyError } from "./helpers";

export const createEmergencyContactHandler = async (req: Request, res: Response) => {
  try {
    const parsed = CreateEmergencyContactSchema.safeParse(req.body);
    if (!parsed.success) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid emergency contact data");

    const contact = await createEmergencyContact({ userId: getAuthenticatedUserId(req), ...parsed.data });
    return res.status(StatusCodes.CREATED).json({ success: true, message: "Emergency contact created", data: contact });
  } catch (error) {
    return handleEmergencyError(error, res);
  }
};
