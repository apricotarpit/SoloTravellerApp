import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const sendFriendRequestHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const getReceivedFriendRequestsHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const getSentFriendRequestsHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const respondFriendRequestHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const cancelFriendRequestHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
