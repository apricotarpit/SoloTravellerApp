"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePackingList = exports.updatePackingList = exports.getPackingListById = exports.getPackingListsByUserId = exports.createPackingList = void 0;
const prisma_1 = require("../client/prisma");
const createPackingList = async (data) => {
    return prisma_1.prisma.packingList.create({
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
exports.createPackingList = createPackingList;
const getPackingListsByUserId = async (userId) => {
    return prisma_1.prisma.packingList.findMany({
        where: { userId },
        include: { items: true },
        orderBy: { createdAt: "desc" },
    });
};
exports.getPackingListsByUserId = getPackingListsByUserId;
const getPackingListById = async (id, userId) => {
    return prisma_1.prisma.packingList.findFirst({
        where: { id, userId },
        include: { items: true },
    });
};
exports.getPackingListById = getPackingListById;
const updatePackingList = async (id, userId, data) => {
    const { items, ...listData } = data;
    return prisma_1.prisma.$transaction(async (transaction) => {
        const existing = await transaction.packingList.findFirst({ where: { id, userId } });
        if (!existing)
            return null;
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
exports.updatePackingList = updatePackingList;
const deletePackingList = async (id, userId) => {
    const result = await prisma_1.prisma.packingList.deleteMany({ where: { id, userId } });
    return result.count > 0;
};
exports.deletePackingList = deletePackingList;
//# sourceMappingURL=query.js.map