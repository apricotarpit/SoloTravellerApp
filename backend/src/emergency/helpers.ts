import { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

import { extractToken, verifyAuthToken } from "../auth/jwt";
import { HttpError } from "../utils/httpResponse";

export const getAuthenticatedUserId = (req: Request) => {
  const token = extractToken(req);
  if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");
  return verifyAuthToken(token).userId;
};

export const parseContactId = (value: string | string[] | undefined) => {
  const normalizedValue = Array.isArray(value) ? value[0] : value;
  const id = Number(normalizedValue);
  if (!Number.isInteger(id) || id <= 0) throw new HttpError(StatusCodes.BAD_REQUEST, "Invalid emergency contact id");
  return id;
};

export const handleEmergencyError = (error: unknown, res: Response) => {
  console.error(error);
  if (error instanceof HttpError) return res.status(error.status).json({ success: false, message: error.message });
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
};
