import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { HttpError } from "../utils/httpResponse";
import { filterUsers, findUserById } from "../auth/query";
import { extractToken, verifyAuthToken } from "../auth/jwt";
import {
	UserFilterQuerySchema,
	paginatedUsersResponseSchema,
} from "./Schema";

export const filterUsersHandler = async (req: Request, res: Response) => {
	try {
		const {
			success: isValidRequestQuery,
			data: parsedRequestQuery,
			error: parsedRequestQueryError,
		} = UserFilterQuerySchema.safeParse(req.query);

		if (!isValidRequestQuery || !parsedRequestQuery) {
			console.error("Validation Error", parsedRequestQueryError);
			throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid request Query");
		}

		const token = extractToken(req);
		if (!token) {
			throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
		}

		const decodedToken = verifyAuthToken(token);
		const loggedInUser = await findUserById(decodedToken.userId);

		if (!loggedInUser) {
			throw new HttpError(StatusCodes.UNAUTHORIZED, "Logged in user not found");
		}

		const isAdmin = loggedInUser.role === "ADMIN";

		const { users, totalCount } = await filterUsers({
			excludeUserId: isAdmin ? undefined : loggedInUser.id,
			city: parsedRequestQuery.city,
			profession: parsedRequestQuery.profession,
			gender: parsedRequestQuery.gender,
			role: parsedRequestQuery.role,
			isActive: parsedRequestQuery.isActive,
			limit: parsedRequestQuery.limit,
			offset: parsedRequestQuery.offset,
		});

		const responseBody = {
			total:
				totalCount > parsedRequestQuery.limit
					? Math.ceil(totalCount / parsedRequestQuery.limit)
					: 1,
			limit: parsedRequestQuery.limit,
			offset: parsedRequestQuery.offset,
			data: users,
		};

		const response = paginatedUsersResponseSchema.parse(responseBody);

		return res.status(StatusCodes.OK).json({
			success: true,
			message: "Users filtered successfully",
			data: response,
		});
	} catch (error) {
		console.error(error);
		if (error instanceof HttpError) {
			return res.status(error.status).json({success: false,message: error.message,});
		}
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
		});
	}
};