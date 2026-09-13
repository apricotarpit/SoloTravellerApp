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
    id?: number;
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
      const existingItems = await transaction.packingItem.findMany({
        where: { packingListId: id },
        select: { id: true },
      });
      const existingItemIds = new Set(existingItems.map((item) => item.id));
      const requestedItemIds = items
        .map((item) => item.id)
        .filter((itemId): itemId is number => itemId !== undefined);

      if (requestedItemIds.some((itemId) => !existingItemIds.has(itemId))) {
        throw new Error("Packing item does not belong to this packing list");
      }

      await transaction.packingItem.deleteMany({
        where: {
          packingListId: id,
          id: { notIn: requestedItemIds },
        },
      });

      for (const item of items) {
        const itemData = {
          name: item.name,
          quantity: item.quantity,
          category: item.category,
          checked: item.checked,
        };

        if (item.id !== undefined) {
          await transaction.packingItem.update({
            where: { id: item.id },
            data: itemData,
          });
        } else {
          await transaction.packingItem.create({
            data: { packingListId: id, ...itemData },
          });
        }
      }
    }

    return transaction.packingList.update({
      where: { id },
      data: {
        ...listData,
      },
      include: { items: true },
    });
  });
};

export const deletePackingList = async (id: number, userId: number) => {
  const result = await prisma.packingList.deleteMany({ where: { id, userId } });
  return result.count > 0;
};
