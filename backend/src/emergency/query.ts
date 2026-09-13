import { prisma } from "../client/prisma";

export const createEmergencyContact = async (data: { userId: number; name: string; phone: string; relation?: string }) => {
  return prisma.emergencyContact.create({
    data: {
      userId: data.userId,
      name: data.name,
      phone: data.phone,
      relation: data.relation ?? null,
    },
  });
};

export const getEmergencyContactsByUserId = async (userId: number) => {
  return prisma.emergencyContact.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  });
};

export const findEmergencyContactById = async (id: number) => {
  return prisma.emergencyContact.findUnique({ where: { id } });
};

export const updateEmergencyContact = async (id: number, data: { name?: string; phone?: string; relation?: string }) => {
  return prisma.emergencyContact.update({
    where: { id },
    data,
  });
};

export const deleteEmergencyContact = async (id: number) => {
  return prisma.emergencyContact.delete({ where: { id } });
};
