import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const submitVerificationHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const getVerificationStatusHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const getPendingVerificationsHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const reviewVerificationHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
