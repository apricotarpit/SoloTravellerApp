import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const createEmergencyContactHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const getEmergencyContactsHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const updateEmergencyContactHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const deleteEmergencyContactHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
