import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { deleteEmergencyContact, findEmergencyContactById } from "./query";
import { getAuthenticatedUserId, handleEmergencyError, parseContactId } from "./helpers";
import { HttpError } from "../utils/httpResponse";

export const deleteEmergencyContactHandler = async (req: Request, res: Response) => {
  try {
    const contact = await findEmergencyContactById(parseContactId(req.params.id));
    if (!contact) throw new HttpError(StatusCodes.NOT_FOUND, "Emergency contact not found");
    if (contact.userId !== getAuthenticatedUserId(req)) throw new HttpError(StatusCodes.FORBIDDEN, "You can only delete your own emergency contacts");

    await deleteEmergencyContact(contact.id);
    return res.status(StatusCodes.OK).json({ success: true, message: "Emergency contact deleted", data: contact });
  } catch (error) {
    return handleEmergencyError(error, res);
  }
};
