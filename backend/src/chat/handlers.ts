import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const createChatHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const getUserChatsHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const getChatMessagesHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const sendMessageHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const updateMessageStatusHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};

export const deleteMessageHandler = async (req: Request, res: Response) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({ success: false, message: "Not implemented" });
};
