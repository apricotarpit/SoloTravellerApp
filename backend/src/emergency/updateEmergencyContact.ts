import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { UpdateEmergencyContactSchema } from "./Schema";
import { findEmergencyContactById, updateEmergencyContact } from "./query";
import { getAuthenticatedUserId, handleEmergencyError, parseContactId } from "./helpers";

export const updateEmergencyContactHandler = async (req: Request, res: Response) => {
  try {
    const parsed = UpdateEmergencyContactSchema.safeParse(req.body);
    if (!parsed.success) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid emergency contact data");

    const contact = await findEmergencyContactById(parseContactId(req.params.id));
    if (!contact) throw new HttpError(StatusCodes.NOT_FOUND, "Emergency contact not found");
    if (contact.userId !== getAuthenticatedUserId(req)) throw new HttpError(StatusCodes.FORBIDDEN, "You can only update your own emergency contacts");

    const updated = await updateEmergencyContact(contact.id, parsed.data);
    return res.status(StatusCodes.OK).json({ success: true, message: "Emergency contact updated", data: updated });
  } catch (error) {
    return handleEmergencyError(error, res);
  }
};
