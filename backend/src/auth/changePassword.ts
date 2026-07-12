import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import bcrypt from "bcrypt";

import { HttpError } from "../utils/httpResponse";
import { ChangePasswordSchema } from "./Schema";
import { extractToken, verifyAuthToken } from "./jwt";
import { findUserByIdWithPassword, updateUserPassword } from "./query";

export const changePasswordHandler = async (req: Request, res: Response) => {
	try {
		const token = extractToken(req);
		if (!token) {
			throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
		}

		const {
			success: isValidRequestBody,
			data: parsedRequestBody,
			error: parsedRequestBodyError,
		} = ChangePasswordSchema.safeParse(req.body);

		if (!isValidRequestBody || !parsedRequestBody) {
			console.error(parsedRequestBodyError);
			throw new HttpError(
				StatusCodes.BAD_REQUEST,
				"Invalid request body" + parsedRequestBodyError
			);
		}

		const decodedToken = verifyAuthToken(token);
		const user = await findUserByIdWithPassword(decodedToken.userId);

		if (!user) {
			throw new HttpError(StatusCodes.NOT_FOUND, "User not found");
		}

		const isOldPasswordValid = await bcrypt.compare(
			parsedRequestBody.oldPassword,
			user.password
		);

		if (!isOldPasswordValid) {
			throw new HttpError(StatusCodes.UNAUTHORIZED, "Old password is incorrect");
		}

		const hashedNewPassword = await bcrypt.hash(parsedRequestBody.newPassword, 10);
		const updatedUser = await updateUserPassword(user.id, hashedNewPassword);

		return res.status(StatusCodes.OK).json({
			success: true,
			message: "Password changed successfully",
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