import { prisma } from "../client/prisma";

export const createChat = async (data: any) => {
  throw new Error("Not implemented");
};

export const getUserChats = async (userId: number) => {
  throw new Error("Not implemented");
};

export const getChatById = async (id: number) => {
  throw new Error("Not implemented");
};

export const createMessage = async (data: any) => {
  throw new Error("Not implemented");
};

export const getChatMessages = async (chatId: number, limit = 50, offset = 0) => {
  throw new Error("Not implemented");
};

export const updateMessageStatus = async (id: number, data: any) => {
  throw new Error("Not implemented");
};

export const deleteMessage = async (id: number) => {
  throw new Error("Not implemented");
};
