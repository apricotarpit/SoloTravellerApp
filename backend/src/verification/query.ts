import { prisma } from "../client/prisma";

export const createVerification = async (data: any) => {
  throw new Error("Not implemented");
};

export const getVerificationsByUserId = async (userId: number) => {
  throw new Error("Not implemented");
};

export const getPendingVerifications = async () => {
  throw new Error("Not implemented");
};

export const updateVerificationStatus = async (id: number, status: string, reviewerId: number) => {
  throw new Error("Not implemented");
};
