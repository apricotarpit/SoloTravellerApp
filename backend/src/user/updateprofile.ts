import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { UpdateProfileSchema } from "../auth/Schema";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import { findUserById, updateUserProfile } from "../auth/query";

export const updateProfileHandler = async (req: Request, res: Response) => {
	try {
        const {
			success: isValidRequestBody,
			data: parsedRequestBody,
			error: parsedRequestBodyError,
		} = UpdateProfileSchema.safeParse(req.body);

		if (!isValidRequestBody || !parsedRequestBody) {
			console.error(parsedRequestBodyError);
			throw new HttpError(
				StatusCodes.BAD_REQUEST,
				"Invalid request body" + parsedRequestBodyError
			);
		}
        
        const token = extractToken(req);
		if (!token) {
			throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
		}

		if (Object.keys(parsedRequestBody).length === 0) {
			throw new HttpError(StatusCodes.BAD_REQUEST, "At least one field is required");
		}

		const decodedToken = verifyAuthToken(token);
		const user = await findUserById(decodedToken.userId);

		if (!user) {
			throw new HttpError(StatusCodes.NOT_FOUND, "User not found");
		}

		const updatedUser = await updateUserProfile(decodedToken.userId, parsedRequestBody);

		return res.status(StatusCodes.OK).json({
			success: true,
			message: "Profile updated successfully",
			data: updatedUser,
		});
	} catch (error) {
		console.error(error);

		if (error instanceof HttpError) {
			return res.status(error.status).json({
				success: false,
				message: error.message,
			});
		}

		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
		});
	}
};
