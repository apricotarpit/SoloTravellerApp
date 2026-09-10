import { Request } from "express";
import { StatusCodes } from "http-status-codes";

import { extractToken, verifyAuthToken } from "../auth/jwt";
import { HttpError } from "../utils/httpResponse";

export const getMatchingUserId = (req: Request) => {
  const token = extractToken(req);
  if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, "Token is required");

  return verifyAuthToken(token).userId;
};

export const parseMatchingId = (value: string | string[] | undefined, name: string) => {
  const normalizedValue = Array.isArray(value) ? value[0] : value;
  const id = Number(normalizedValue);
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(StatusCodes.BAD_REQUEST, `Invalid ${name} id`);
  }

  return id;
};
