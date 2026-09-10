import { prisma } from "../client/prisma";

export const createTrip = async (data: {
  userId: number;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget?: number | null;
  tripType?: string | null;
  description?: string | null;
}) => {
  const createData: any = {
    userId: data.userId,
    destination: data.destination,
    startDate: data.startDate,
    endDate: data.endDate,
    budget: data.budget ?? null,
    ...(data.tripType !== undefined && data.tripType !== null ? { tripType: data.tripType } : {}),
    description: data.description ?? null,
  };

  return prisma.trip.create({
    data: createData as any,
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
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getTrips = async (filters: {
  destination?: string;
  tripType?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}) => {
  const where: any = {};

  if (filters.destination) where.destination = { contains: filters.destination, mode: "insensitive" };
  if (filters.tripType) where.tripType = filters.tripType;
  if (filters.status) where.status = filters.status;
  if (filters.startDate && filters.endDate)
    where.AND = [{ startDate: { gte: filters.startDate } }, { endDate: { lte: filters.endDate } }];

  const [totalCount, trips] = await Promise.all([
    prisma.trip.count({ where }),
    prisma.trip.findMany({
      where,
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
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: filters.limit ?? 20,
      skip: filters.offset ?? 0,
    }),
  ]);

  return { trips, totalCount };
};

export const getTripById = async (id: number) => {
  return prisma.trip.findUnique({
    where: { id },
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
      createdAt: true,
      updatedAt: true,
      requests: {
        select: { id: true, senderId: true, receiverId: true, status: true, createdAt: true },
      },
    },
  });
};

export const getTripsByUserId = async (userId: number) => {
  const [totalCount, trips] = await Promise.all([
    prisma.trip.count({ where: { userId } }),
    prisma.trip.findMany({
      where: { userId },
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
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return { trips, totalCount };
};

export const updateTrip = async (id: number, data: any) => {
  return prisma.trip.update({
    where: { id },
    data: {
      ...(data.destination !== undefined ? { destination: data.destination } : {}),
      ...(data.startDate !== undefined ? { startDate: data.startDate } : {}),
      ...(data.endDate !== undefined ? { endDate: data.endDate } : {}),
      ...(data.budget !== undefined ? { budget: data.budget } : {}),
      ...(data.tripType !== undefined ? { tripType: data.tripType } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
    },
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
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const deleteTrip = async (id: number) => {
  return prisma.trip.delete({ where: { id } });
};
