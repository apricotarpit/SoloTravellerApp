import prisma from "../client/prisma";

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export const findUserById = async (id: number) => {
    return prisma.user.findUnique({
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

export const findUserByIdWithPassword = async (id: number) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            password: true,
        },
    });
};

export const updateUserPassword = async (id: number, password: string) => {
    return prisma.user.update({
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


export interface CreateUserInput {
    fullName: string;
    email: string;
    password: string;
    age: number;
    gender: "MALE" | "FEMALE" | "OTHER";
    phone?: string;
    profession?: string;
    city?: string;
    bio?: string;
    profileImage?: string;
}

export const createUserQuery = async (
    data: CreateUserInput
) => {
    return prisma.user.create({
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