"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserQuery = exports.updateUserProfile = exports.updateUserPassword = exports.findUserByIdWithPassword = exports.filterUsers = exports.findAllUsersExceptId = exports.findAllUsers = exports.findUserById = exports.findUserByEmail = void 0;
const prisma_1 = __importDefault(require("../client/prisma"));
const findUserByEmail = async (email) => {
    return prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
};
exports.findUserByEmail = findUserByEmail;
const findUserById = async (id) => {
    return prisma_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            profession: true,
            city: true,
            bio: true,
            phone: true,
            profileImage: true,
            age: true,
            gender: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};
exports.findUserById = findUserById;
const findAllUsers = async () => {
    return prisma_1.default.user.findMany({
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            profession: true,
            city: true,
            bio: true,
            phone: true,
            profileImage: true,
            age: true,
            gender: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.findAllUsers = findAllUsers;
const findAllUsersExceptId = async (userId) => {
    return prisma_1.default.user.findMany({
        where: {
            id: {
                not: userId,
            },
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            profession: true,
            city: true,
            bio: true,
            phone: true,
            profileImage: true,
            age: true,
            gender: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.findAllUsersExceptId = findAllUsersExceptId;
const filterUsers = async (filters) => {
    const search = filters.search?.trim();
    const where = {
        ...(filters.excludeUserId !== undefined
            ? {
                id: {
                    not: filters.excludeUserId,
                },
            }
            : {}),
        ...(filters.city
            ? { city: { contains: filters.city, mode: "insensitive" } }
            : {}),
        ...(filters.profession
            ? { profession: { contains: filters.profession, mode: "insensitive" } }
            : {}),
        ...(filters.gender ? { gender: filters.gender } : {}),
        ...(filters.role ? { role: filters.role } : {}),
        ...(filters.isActive !== undefined ? { isActive: filters.isActive } : {}),
        ...(search
            ? {
                OR: [
                    { fullName: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                    { city: { contains: search, mode: "insensitive" } },
                    { profession: { contains: search, mode: "insensitive" } },
                ],
            }
            : {}),
    };
    const [totalCount, users] = await Promise.all([
        prisma_1.default.user.count({ where }),
        prisma_1.default.user.findMany({
            where,
            select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
                profession: true,
                city: true,
                bio: true,
                phone: true,
                profileImage: true,
                age: true,
                gender: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: filters.limit,
            skip: filters.offset,
        }),
    ]);
    return { users, totalCount };
};
exports.filterUsers = filterUsers;
const findUserByIdWithPassword = async (id) => {
    return prisma_1.default.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            password: true,
        },
    });
};
exports.findUserByIdWithPassword = findUserByIdWithPassword;
const updateUserPassword = async (id, password) => {
    return prisma_1.default.user.update({
        where: {
            id,
        },
        data: {
            password,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};
exports.updateUserPassword = updateUserPassword;
const updateUserProfile = async (id, data) => {
    return prisma_1.default.user.update({
        where: {
            id,
        },
        data: {
            ...(data.fullName !== undefined ? { fullName: data.fullName } : {}),
            ...(data.phone !== undefined ? { phone: data.phone } : {}),
            ...(data.email !== undefined ? { email: data.email } : {}),
            ...(data.age !== undefined ? { age: data.age } : {}),
            ...(data.gender !== undefined ? { gender: data.gender } : {}),
            ...(data.profession !== undefined ? { profession: data.profession } : {}),
            ...(data.city !== undefined ? { city: data.city } : {}),
            ...(data.bio !== undefined ? { bio: data.bio } : {}),
            ...(data.profileImage !== undefined ? { profileImage: data.profileImage } : {}),
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            profession: true,
            city: true,
            bio: true,
            phone: true,
            profileImage: true,
            age: true,
            gender: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};
exports.updateUserProfile = updateUserProfile;
const createUserQuery = async (data) => {
    return prisma_1.default.user.create({
        data: {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            age: data.age,
            gender: data.gender,
            phone: data.phone,
            profession: data.profession,
            city: data.city,
            bio: data.bio,
            profileImage: data.profileImage,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            profession: true,
            createdAt: true,
        },
    });
};
exports.createUserQuery = createUserQuery;
//# sourceMappingURL=query.js.map