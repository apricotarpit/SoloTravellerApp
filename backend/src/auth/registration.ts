import { Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import bcrypt from "bcrypt";

import { HttpError } from "../utils/httpResponse";
import { CreateSchema } from "./Schema";
import { createUserQuery, findUserByEmail } from "./query";

export const registerHandler = async (req: Request, res: Response) => {
    try {
        const {
            success:isValidRequestBody,
            data: parsedRequestBody,
            error:parsedRequestBodyError,
        } = CreateSchema.safeParse(req.body);

        if (!isValidRequestBody || !parsedRequestBody) {
            console.error(parsedRequestBodyError);
            throw new HttpError(StatusCodes.BAD_REQUEST,"Invalid request body"+ parsedRequestBodyError);
        }

        const existingUser = await findUserByEmail(parsedRequestBody.email);
        if (existingUser) {
            throw new HttpError(StatusCodes.CONFLICT,"Email already exists");
        }

        const hashedPassword = await bcrypt.hash(
            parsedRequestBody.password,
            10
        );

        const user = await createUserQuery({
            ...parsedRequestBody,
            password: hashedPassword,
        });

        if (!user) {
            throw new HttpError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                "Unable to create user"
            );
        }

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User registered successfully",
            data: {
                user,
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
            message: getReasonPhrase(
                StatusCodes.INTERNAL_SERVER_ERROR
            ),
        });
    }
};