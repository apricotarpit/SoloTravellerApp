import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { HttpError } from "../utils/httpResponse";
import { getTripsByUserId } from "./query";
import { UserIdSchema } from "./Schema";

export const getUserTripsHandler = async (req: Request, res: Response) => {
  try {
    const {
        success: isValidUserId,
        data: parsedUserId,
        error: parsedUserIdError,
    } = UserIdSchema.safeParse(req.params);
        
    if (!isValidUserId || !parsedUserId) {
      console.error(parsedUserIdError);
      throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid User id " + parsedUserIdError);
    }
    const UserId = parsedUserId.userid;

    const result = await getTripsByUserId(UserId);

    return res.status(StatusCodes.OK).json({ success: true, message: "User trips fetched", data: result });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      return res.status(error.status).json({ success: false, message: error.message });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
  }
};
