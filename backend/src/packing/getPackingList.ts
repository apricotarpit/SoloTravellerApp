import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { getPackingListById } from "./query";

export const getPackingListHandler = async (req: Request, res: Response) => {
  try {
    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");

    const { userId } = verifyAuthToken(token);
    const listId = Number(req.params.id);
    if (!Number.isInteger(listId) || listId <= 0) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid packing list id");

    const list = await getPackingListById(listId, userId);
    if (!list) throw new HttpError(StatusCodes.NOT_FOUND, "Packing list not found");

    return res.status(StatusCodes.OK).json({ success: true, message: "Packing list fetched", data: list });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};