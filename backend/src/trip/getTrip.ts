import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { HttpError } from "../utils/httpResponse";
import { getTripById } from "./query";

export const getTripHandler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid trip id");

    const trip = await getTripById(id);
    if (!trip) throw new HttpError(StatusCodes.NOT_FOUND, "Trip not found");

    return res.status(StatusCodes.OK).json({ success: true, message: "Trip fetched", data: trip });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return res.status(error.status).json({ success: false, message: error.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
