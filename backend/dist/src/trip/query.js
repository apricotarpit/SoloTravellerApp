"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrip = exports.updateTrip = exports.getTripsByUserId = exports.getTripById = exports.getTrips = exports.createTrip = void 0;
const prisma_1 = require("../client/prisma");
const createTrip = async (data) => {
    const createData = {
        userId: data.userId,
        destination: data.destination,
        startDate: data.startDate,
        endDate: data.endDate,
        budget: data.budget ?? null,
        ...(data.tripType !== undefined && data.tripType !== null ? { tripType: data.tripType } : {}),
        description: data.description ?? null,
    };
    return prisma_1.prisma.trip.create({
        data: createData,
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
exports.createTrip = createTrip;
const getTrips = async (filters) => {
    const where = {};
    if (filters.destination)
        where.destination = { contains: filters.destination, mode: "insensitive" };
    if (filters.tripType)
        where.tripType = filters.tripType;
    if (filters.status)
        where.status = filters.status;
    if (filters.startDate && filters.endDate)
        where.AND = [{ startDate: { gte: filters.startDate } }, { endDate: { lte: filters.endDate } }];
    const [totalCount, trips] = await Promise.all([
        prisma_1.prisma.trip.count({ where }),
        prisma_1.prisma.trip.findMany({
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
exports.getTrips = getTrips;
const getTripById = async (id) => {
    return prisma_1.prisma.trip.findUnique({
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
exports.getTripById = getTripById;
const getTripsByUserId = async (userId) => {
    const [totalCount, trips] = await Promise.all([
        prisma_1.prisma.trip.count({ where: { userId } }),
        prisma_1.prisma.trip.findMany({
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
exports.getTripsByUserId = getTripsByUserId;
const updateTrip = async (id, data) => {
    return prisma_1.prisma.trip.update({
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
exports.updateTrip = updateTrip;
const deleteTrip = async (id) => {
    return prisma_1.prisma.trip.delete({ where: { id } });
};
exports.deleteTrip = deleteTrip;
//# sourceMappingURL=query.js.map