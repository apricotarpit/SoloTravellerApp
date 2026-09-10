import { prisma } from "../client/prisma";

export const createPackingList = async (data: {
  userId: number;
  name: string;
  destination?: string;
  startDate?: Date;
  endDate?: Date;
  items: Array<{
    name: string;
    quantity: number;
    category?: string;
    checked: boolean;
  }>;
}) => {
  return prisma.packingList.create({
    data: {
      userId: data.userId,
      name: data.name,
      destination: data.destination,
      startDate: data.startDate,
      endDate: data.endDate,
      items: {
        create: data.items,
      },
    },
    include: { items: true },
  });
};

export const getPackingListsByUserId = async (userId: number) => {
  return prisma.packingList.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getPackingListById = async (id: number, userId: number) => {
  return prisma.packingList.findFirst({
    where: { id, userId },
    include: { items: true },
  });
};

export const updatePackingList = async (id: number, userId: number, data: {
  name?: string;
  destination?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  items?: Array<{
    name: string;
    quantity: number;
    category?: string;
    checked: boolean;
  }>;
}) => {
  const { items, ...listData } = data;

  return prisma.$transaction(async (transaction) => {
    const existing = await transaction.packingList.findFirst({ where: { id, userId } });
    if (!existing) return null;

    if (items !== undefined) {
      await transaction.packingItem.deleteMany({ where: { packingListId: id } });
    }

    return transaction.packingList.update({
      where: { id },
      data: {
        ...listData,
        ...(items !== undefined ? { items: { create: items } } : {}),
      },
      include: { items: true },
    });
  });
};

export const deletePackingList = async (id: number, userId: number) => {
  const result = await prisma.packingList.deleteMany({ where: { id, userId } });
  return result.count > 0;
};
