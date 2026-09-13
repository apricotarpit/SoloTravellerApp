"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMatchRequestStatus = exports.findMatchRequestById = exports.getMatchRequestsForUser = exports.getMatchRequestsByTripId = exports.createMatchRequest = exports.findPendingMatchRequest = exports.findUserById = exports.findTripById = void 0;
const prisma_1 = require("../client/prisma");
const userSelect = {
    id: true,
    fullName: true,
    email: true,
    role: true,
    profession: true,
    city: true,
    profileImage: true,
    verified: true,
};
const requestSelect = {
    id: true,
    senderId: true,
    receiverId: true,
    tripId: true,
    status: true,
    createdAt: true,
    sender: { select: userSelect },
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
};
const findTripById = async (tripId) => {
    return prisma_1.prisma.trip.findUnique({
        where: { id: tripId },
        select: { id: true, userId: true, status: true },
    });
};
exports.findTripById = findTripById;
const findUserById = async (userId) => {
    return prisma_1.prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
};
exports.findUserById = findUserById;
const findPendingMatchRequest = async (senderId, receiverId, tripId) => {
    return prisma_1.prisma.matchRequest.findFirst({
        where: { senderId, receiverId, tripId, status: "PENDING" },
        select: { id: true },
    });
};
exports.findPendingMatchRequest = findPendingMatchRequest;
const createMatchRequest = async (data) => {
    return prisma_1.prisma.matchRequest.create({
        data,
        select: requestSelect,
    });
};
exports.createMatchRequest = createMatchRequest;
const getMatchRequestsByTripId = async (tripId) => {
    return prisma_1.prisma.matchRequest.findMany({
        where: { tripId },
        select: requestSelect,
        orderBy: { createdAt: "desc" },
    });
};
exports.getMatchRequestsByTripId = getMatchRequestsByTripId;
const getMatchRequestsForUser = async (userId) => {
    return prisma_1.prisma.matchRequest.findMany({
        where: { receiverId: userId },
        select: requestSelect,
        orderBy: { createdAt: "desc" },
    });
};
exports.getMatchRequestsForUser = getMatchRequestsForUser;
const findMatchRequestById = async (id) => {
    return prisma_1.prisma.matchRequest.findUnique({
        where: { id },
        select: { id: true, receiverId: true, status: true },
    });
};
exports.findMatchRequestById = findMatchRequestById;
const updateMatchRequestStatus = async (id, status) => {
    return prisma_1.prisma.matchRequest.update({
        where: { id },
        data: { status },
        select: requestSelect,
    });
};
exports.updateMatchRequestStatus = updateMatchRequestStatus;
//# sourceMappingURL=query.js.map