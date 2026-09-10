import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { UpdatePackingListSchema } from "./Schema";
import { getPackingListById, updatePackingList } from "./query";

export const updatePackingListHandler = async (req: Request, res: Response) => {
  try {
    const parsed = UpdatePackingListSchema.safeParse(req.body);
    if (!parsed.success) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid request body");

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");

    const { userId } = verifyAuthToken(token);
    const listId = Number(req.params.id);
    if (!Number.isInteger(listId) || listId <= 0) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid packing list id");

    const updated = await updatePackingList(listId, userId, {
      name: parsed.data.name,
      destination: parsed.data.destination,
      startDate: parsed.data.startDate === undefined ? undefined : parsed.data.startDate === null ? null : new Date(parsed.data.startDate),
      endDate: parsed.data.endDate === undefined ? undefined : parsed.data.endDate === null ? null : new Date(parsed.data.endDate),
      items: parsed.data.items,
    });
    if (!updated) throw new HttpError(StatusCodes.NOT_FOUND, "Packing list not found");

    return res.status(StatusCodes.OK).json({ success: true, message: "Packing list updated", data: updated });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};