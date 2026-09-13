import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { deletePackingList ,getPackingListById} from "./query";
import { IdSchema } from "../trip/Schema";

export const deletePackingListHandler = async (req: Request, res: Response) => {
  try {
    const {
      success: isValidListId,
      data: parsedListId,
      error: parsedListIdError,
    } = IdSchema.safeParse(req.params);
            
    if (!isValidListId || !parsedListId) {
      console.error(parsedListIdError);
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid User id " + parsedListIdError);
    }
    const ListId = parsedListId.tripid;

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");

    const { userId } = verifyAuthToken(token);

    const deleted = await deletePackingList(ListId, userId);
    if (!deleted) throw new HttpError(StatusCodes.NOT_FOUND, "Packing list not found");

    const list = await getPackingListById(ListId, userId);

    return res.status(StatusCodes.OK).json({ success: true, message: "Packing list deleted" ,data: list});
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};