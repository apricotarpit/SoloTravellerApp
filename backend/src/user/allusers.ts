import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { findAllUsersExceptId, findUserById } from "../auth/query";
import { extractToken, verifyAuthToken } from "../auth/jwt";

export const allUsersHandler = async (req: Request, res: Response) => {
	try {
		const token = extractToken(req);
		if (!token) {
			throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
		}

		const decodedToken = verifyAuthToken(token);
		const loggedInUser = await findUserById(decodedToken.userId);
		if (!loggedInUser) {
			throw new HttpError(StatusCodes.UNAUTHORIZED, "Logged in user not found");
		}

		const users = await findAllUsersExceptId(decodedToken.userId);

		return res.status(StatusCodes.OK).json({
			success: true,
			message: "All users fetched successfully",
			data: users,
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