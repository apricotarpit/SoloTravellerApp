import { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { HttpError } from "../utils/httpResponse";
import { RespondInviteSchema } from "./Schema";
import { findInviteById, updateInviteStatus } from "./query";

export const respondTripInviteHandler = async (req: Request, res: Response) => {
  try {
    const {
      success:isValidRequestBody,
      data: parsedRequestBody,
      error:parsedRequestBodyError,
    } = RespondInviteSchema.safeParse(req.body);
                    
    if (!isValidRequestBody || !parsedRequestBody) {
      console.error(parsedRequestBodyError);            
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid request body"+ parsedRequestBodyError);
    }


    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
    const userId =verifyAuthToken(token).userId;

    const parseInviteId = (value: string | string[] | undefined, name: string) => {
      const normalizedValue = Array.isArray(value) ? value[0] : value;
      const id = Number(normalizedValue);
      if (!Number.isInteger(id) || id <= 0) {
        throw new HttpError(StatusCodes.BAD_REQUEST, `Invalid ${name} id`);
      }
      return id;
    };
    const inviteId = parseInviteId(req.params.id, "invite");
    const invite = await findInviteById(inviteId);

    if (!invite) throw new HttpError(StatusCodes.NOT_FOUND, "Trip invite not found");
    if (invite.receiverId !== userId) {
      throw new HttpError(StatusCodes.FORBIDDEN, "Only the invite receiver can respond");
    }
    if (invite.status !== "PENDING") {
      throw new HttpError(StatusCodes.CONFLICT, "This trip invite has already been handled");
    }

    const updated = await updateInviteStatus(inviteId, parsedRequestBody.status);
    return res.status(StatusCodes.OK).json({ success: true, message: "Trip invite updated", data: updated });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
