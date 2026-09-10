"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInviteStatus = exports.findInviteById = exports.getReceivedInvites = exports.getTripInvitesByTripId = exports.createTripInvite = exports.findPendingInvite = exports.findUserById = exports.findTripById = void 0;
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
const findPendingInvite = async (tripId, senderId, receiverId) => {
    return prisma_1.prisma.tripInvite.findFirst({
        where: { tripId, senderId, receiverId, status: "PENDING" },
        select: { id: true },
    });
};
exports.findPendingInvite = findPendingInvite;
const createTripInvite = async (data) => {
    return prisma_1.prisma.tripInvite.create({
        data: { ...data, message: data.message ?? null },
        select: inviteSelect,
    });
};
exports.createTripInvite = createTripInvite;
const getTripInvitesByTripId = async (tripId) => {
    return prisma_1.prisma.tripInvite.findMany({
        where: { tripId },
        select: inviteSelect,
        orderBy: { createdAt: "desc" },
    });
};
exports.getTripInvitesByTripId = getTripInvitesByTripId;
const getReceivedInvites = async (userId) => {
    return prisma_1.prisma.tripInvite.findMany({
        where: { receiverId: userId },
        select: inviteSelect,
        orderBy: { createdAt: "desc" },
    });
};
exports.getReceivedInvites = getReceivedInvites;
const findInviteById = async (id) => {
    return prisma_1.prisma.tripInvite.findUnique({
        where: { id },
        select: { id: true, receiverId: true, status: true },
    });
};
exports.findInviteById = findInviteById;
const updateInviteStatus = async (id, status) => {
    return prisma_1.prisma.tripInvite.update({
        where: { id },
        data: { status },
        select: inviteSelect,
    });
};
exports.updateInviteStatus = updateInviteStatus;
//# sourceMappingURL=query.js.map