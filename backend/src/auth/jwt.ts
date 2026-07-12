import { Request } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";

import config from "../config";

export interface JwtUserPayload {
    userId: number;
    email: string;
    role: string;
}

export const createAuthToken = (payload: JwtUserPayload) => {
    return jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    });
};

export const verifyAuthToken = (token: string) => {
    return jwt.verify(token, config.JWT_SECRET) as JwtUserPayload & {
        iat: number;
        exp: number;
    };
};

export const extractToken = (req: Request) => {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
        return authHeader.slice(7);
    }

    return null;
};