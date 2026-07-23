import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { findUserById } from "../auth/query";
import { extractToken, verifyAuthToken } from "../auth/jwt";

export const otherUserHandler = async (req: Request, res: Response) => {
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

		const userId = Number(req.params.id);
		const user = await findUserById(userId);
		if (!user) {
			throw new HttpError(StatusCodes.NOT_FOUND, "User not found");
		}

		return res.status(StatusCodes.OK).json({
			success: true,
			message: "User fetched successfully",
			data: user,
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