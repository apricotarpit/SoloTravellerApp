import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { UpdatePackingListSchema } from "./Schema";
import { packingIdSchema } from "./Schema";
import { updatePackingList } from "./query";

export const updatePackingListHandler = async (req: Request, res: Response) => {
  try {
    const {
      success: isValidTripId,
      data: parsedTripId,
      error: parsedTripIdError,
    } = packingIdSchema.safeParse(req.params);
    
    if (!isValidTripId || !parsedTripId) {
      console.error(parsedTripIdError);
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid trip id " + parsedTripIdError);
    }
    const packingId = parsedTripId.id;

    const {
      success:isValidRequestBody,
      data: parsedRequestBody,
      error:parsedRequestBodyError,
    } = UpdatePackingListSchema.safeParse(req.body);
            
    if (!isValidRequestBody || !parsedRequestBody) {
      console.error(parsedRequestBodyError);            
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid request body"+ parsedRequestBodyError);
    }

    const token = extractToken(req);
    if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
    const { userId } = verifyAuthToken(token);

    const updated = await updatePackingList(packingId, userId, {
      name: parsedRequestBody.name,
      destination: parsedRequestBody.destination,
      startDate: parsedRequestBody.startDate === undefined ? undefined : parsedRequestBody.startDate === null ? null : new Date(parsedRequestBody.startDate),
      endDate: parsedRequestBody.endDate === undefined ? undefined : parsedRequestBody.endDate === null ? null : new Date(parsedRequestBody.endDate),
      items: parsedRequestBody.items?.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        category: item.category,
        checked: item.checked,
      })),
    });
    if (!updated) throw new HttpError(StatusCodes.NOT_FOUND, "Packing list not found");

    return res.status(StatusCodes.OK).json({ success: true, message: "Packing list updated", data: updated });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};