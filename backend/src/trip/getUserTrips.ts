import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { HttpError } from "../utils/httpResponse";
import { getTripsByUserId } from "./query";

export const getUserTripsHandler = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (Number.isNaN(userId)) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid user id");

    const result = await getTripsByUserId(userId);

    return res.status(StatusCodes.OK).json({ success: true, message: "User trips fetched", data: result });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return res.status(error.status).json({ success: false, message: error.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
