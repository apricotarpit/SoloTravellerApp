import { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { getInviteUserId, parseInviteId } from "./auth";
import { RespondInviteSchema } from "./Schema";
import { findInviteById, updateInviteStatus } from "./query";

export const respondTripInviteHandler = async (req: Request, res: Response) => {
  try {
    const parsed = RespondInviteSchema.safeParse(req.body);
    if (!parsed.success) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid request body");

    const userId = getInviteUserId(req);
    const inviteId = parseInviteId(req.params.id, "invite");
    const invite = await findInviteById(inviteId);

    if (!invite) throw new HttpError(StatusCodes.NOT_FOUND, "Trip invite not found");
    if (invite.receiverId !== userId) {
      throw new HttpError(StatusCodes.FORBIDDEN, "Only the invite receiver can respond");
    }
    if (invite.status !== "PENDING") {
      throw new HttpError(StatusCodes.CONFLICT, "This trip invite has already been handled");
    }

    const updated = await updateInviteStatus(inviteId, parsed.data.status);
    return res.status(StatusCodes.OK).json({ success: true, message: "Trip invite updated", data: updated });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
