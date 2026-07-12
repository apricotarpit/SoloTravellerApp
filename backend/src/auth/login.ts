import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import bcrypt from "bcrypt";

import { HttpError } from "../utils/httpResponse";
import { LoginSchema } from "./Schema";
import { createAuthToken } from "./jwt";
import { findUserByEmail } from "./query";

export const loginHandler = async (req: Request, res: Response) => {
	try {
		const {
			success: isValidRequestBody,
			data: parsedRequestBody,
			error: parsedRequestBodyError,
		} = LoginSchema.safeParse(req.body);

		if (!isValidRequestBody || !parsedRequestBody) {
			console.error(parsedRequestBodyError);
			throw new HttpError(
				StatusCodes.BAD_REQUEST,
				"Invalid request body" + parsedRequestBodyError
			);
		}

		const user = await findUserByEmail(parsedRequestBody.email);
		if (!user) {
			throw new HttpError(StatusCodes.NOT_FOUND, "User not found");
		}

		const isPasswordValid = await bcrypt.compare(
			parsedRequestBody.password,
			user.password
		);

		if (!isPasswordValid) {
			throw new HttpError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
		}

		const token = createAuthToken({
			userId: user.id,
			email: user.email,
			role: user.role,
		});

		return res.status(StatusCodes.OK).json({
			success: true,
			message: "User logged in successfully",
			data: {
				user: {
					id: user.id,
					fullName: user.fullName,
					email: user.email,
					role: user.role,
                    profession: user.profession,
					createdAt: user.createdAt,
				},
				token,
			},
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
