import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { CreatePackingListSchema } from "./Schema";
import { createPackingList } from "./query";

export const createPackingListHandler = async (req: Request, res: Response) => {
  try {
    const {
      success:isValidRequestBody,
      data: parsedRequestBody,
      error:parsedRequestBodyError,
    } = CreatePackingListSchema.safeParse(req.body);
        
    if (!isValidRequestBody || !parsedRequestBody) {
      console.error(parsedRequestBodyError);            
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid request body"+ parsedRequestBodyError);
    }

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");

    const { userId } = verifyAuthToken(token);
    const created = await createPackingList({
      userId,
      name: parsedRequestBody.name,
      destination: parsedRequestBody.destination,
      startDate: parsedRequestBody.startDate ? new Date(parsedRequestBody.startDate) : undefined,
      endDate: parsedRequestBody.endDate ? new Date(parsedRequestBody.endDate) : undefined,
      items: parsedRequestBody.items,
    });

    return res.status(StatusCodes.CREATED).json({ success: true, message: "Packing list created", data: created });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
