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

const requestSelect = {
  id: true,
  senderId: true,
  receiverId: true,
  tripId: true,
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

export const findPendingMatchRequest = async (senderId: number, receiverId: number, tripId: number) => {
  return prisma.matchRequest.findFirst({
    where: { senderId, receiverId, tripId, status: "PENDING" },
    select: { id: true },
  });
};

export const createMatchRequest = async (data: {
  senderId: number;
  receiverId: number;
  tripId: number;
}) => {
  return prisma.matchRequest.create({
    data,
    select: requestSelect,
  });
};

export const getMatchRequestsByTripId = async (tripId: number) => {
  return prisma.matchRequest.findMany({
    where: { tripId },
    select: requestSelect,
    orderBy: { createdAt: "desc" },
  });
};

export const getMatchRequestsForUser = async (userId: number) => {
  return prisma.matchRequest.findMany({
    where: { receiverId: userId },
    select: requestSelect,
    orderBy: { createdAt: "desc" },
  });
};

export const findMatchRequestById = async (id: number) => {
  return prisma.matchRequest.findUnique({
    where: { id },
    select: { id: true, receiverId: true, status: true },
  });
};

export const updateMatchRequestStatus = async (id: number, status: "ACCEPTED" | "REJECTED") => {
  return prisma.matchRequest.update({
    where: { id },
    data: { status },
    select: requestSelect,
  });
};
