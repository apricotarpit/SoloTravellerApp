import { prisma } from "../client/prisma";

const userSelect = {
  id: true,
  fullName: true,
  email: true,
  role: true,
  profession: true,
  city: true,
  profileImage: true,
  verified: true,
} as const;

const inviteSelect = {
  id: true,
  tripId: true,
  senderId: true,
  receiverId: true,
  message: true,
  status: true,
  createdAt: true,
  sender: { select: userSelect },
  receiver: { select: userSelect },
  trip: {
    select: {
      id: true,
      userId: true,
      destination: true,
      startDate: true,
      endDate: true,
      budget: true,
      tripType: true,
      description: true,
      status: true,
    },
  },
} as const;

export const findTripById = async (tripId: number) => {
  return prisma.trip.findUnique({
    where: { id: tripId },
    select: { id: true, userId: true, status: true },
  });
};

export const findUserById = async (userId: number) => {
  return prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
};

export const findPendingInvite = async (tripId: number, senderId: number, receiverId: number) => {
  return prisma.tripInvite.findFirst({
    where: { tripId, senderId, receiverId, status: "PENDING" },
    select: { id: true },
  });
};

export const createTripInvite = async (data: {
  tripId: number;
  senderId: number;
  receiverId: number;
  message?: string;
}) => {
  return prisma.tripInvite.create({
    data: { ...data, message: data.message ?? null },
    select: inviteSelect,
  });
};

export const getTripInvitesByTripId = async (tripId: number) => {
  return prisma.tripInvite.findMany({
    where: { tripId },
    select: inviteSelect,
    orderBy: { createdAt: "desc" },
  });
};

export const getReceivedInvites = async (userId: number) => {
  return prisma.tripInvite.findMany({
    where: { receiverId: userId },
    select: inviteSelect,
    orderBy: { createdAt: "desc" },
  });
};

export const findInviteById = async (id: number) => {
  return prisma.tripInvite.findUnique({
    where: { id },
    select: { id: true, receiverId: true, status: true },
  });
};

export const updateInviteStatus = async (id: number, status: "ACCEPTED" | "DECLINED") => {
  return prisma.tripInvite.update({
    where: { id },
    data: { status },
    select: inviteSelect,
  });
};
