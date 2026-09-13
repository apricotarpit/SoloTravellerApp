import { Request, Response } from "express";
import { StatusCodes,getReasonPhrase } from "http-status-codes";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { HttpError } from "../utils/httpResponse";
import { UpdateEmergencyContactSchema ,parseContactId} from "./Schema";
import { findEmergencyContactById, updateEmergencyContact } from "./query";

export const updateEmergencyContactHandler = async (req: Request, res: Response) => {
  try {
    const {
      success: isValidrequestBody,
      data: parsedrequestBody,
      error: parsedrequestBodyError,
    } = UpdateEmergencyContactSchema.safeParse(req.body);
                
    if (!isValidrequestBody || !parsedrequestBody) {
      console.error(parsedrequestBodyError);
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid emergency contact data" + parsedrequestBodyError);
    }
    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
    const userid= verifyAuthToken(token).userId;

    const contact = await findEmergencyContactById(parseContactId(req.params.id));
    if (!contact) throw new HttpError(StatusCodes.NOT_FOUND, "Emergency contact not found");

    if (contact.userId !== userid) throw new HttpError(StatusCodes.FORBIDDEN, "You can only update your own emergency contacts");

    const updated = await updateEmergencyContact(contact.id, parsedrequestBody);
    return res.status(StatusCodes.OK).json({ success: true, message: "Emergency contact updated", data: updated });
  } 
  catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
