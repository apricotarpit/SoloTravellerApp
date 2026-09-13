"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmergencyContact = exports.updateEmergencyContact = exports.findEmergencyContactById = exports.getEmergencyContactsByUserId = exports.createEmergencyContact = void 0;
const prisma_1 = require("../client/prisma");
const createEmergencyContact = async (data) => {
    return prisma_1.prisma.emergencyContact.create({
        data: {
            userId: data.userId,
            name: data.name,
            phone: data.phone,
            relation: data.relation ?? null,
        },
    });
};
exports.createEmergencyContact = createEmergencyContact;
const getEmergencyContactsByUserId = async (userId) => {
    return prisma_1.prisma.emergencyContact.findMany({
        where: { userId },
        orderBy: { id: "desc" },
    });
};
exports.getEmergencyContactsByUserId = getEmergencyContactsByUserId;
const findEmergencyContactById = async (id) => {
    return prisma_1.prisma.emergencyContact.findUnique({ where: { id } });
};
exports.findEmergencyContactById = findEmergencyContactById;
const updateEmergencyContact = async (id, data) => {
    return prisma_1.prisma.emergencyContact.update({
        where: { id },
        data,
    });
};
exports.updateEmergencyContact = updateEmergencyContact;
const deleteEmergencyContact = async (id) => {
    return prisma_1.prisma.emergencyContact.delete({ where: { id } });
};
exports.deleteEmergencyContact = deleteEmergencyContact;
//# sourceMappingURL=query.js.map