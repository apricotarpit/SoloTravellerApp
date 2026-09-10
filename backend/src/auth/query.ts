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

export const findAllUsers = async () => {
    return prisma.user.findMany({
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

export const findAllUsersExceptId = async (userId: number) => {
    return prisma.user.findMany({
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

export interface FilterUsersInput {
    excludeUserId?: number;
    search?: string;
    city?: string;
    profession?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    role?: "USER" | "ADMIN";
    isActive?: boolean;
    limit: number;
    offset: number;
}

export const filterUsers = async (filters: FilterUsersInput) => {
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
            ? { city: { contains: filters.city, mode: "insensitive" as const } }
            : {}),
        ...(filters.profession
            ? { profession: { contains: filters.profession, mode: "insensitive" as const } }
            : {}),
        ...(filters.gender ? { gender: filters.gender } : {}),
        ...(filters.role ? { role: filters.role } : {}),
        ...(filters.isActive !== undefined ? { isActive: filters.isActive } : {}),
        ...(search
            ? {
                  OR: [
                      { fullName: { contains: search, mode: "insensitive" as const } },
                      { email: { contains: search, mode: "insensitive" as const } },
                      { city: { contains: search, mode: "insensitive" as const } },
                      { profession: { contains: search, mode: "insensitive" as const } },
                  ],
              }
            : {}),
    };

    const [totalCount, users] = await Promise.all([
        prisma.user.count({ where }),
        prisma.user.findMany({
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

export interface UpdateUserProfileInput {
    fullName?: string;
    phone?: string;
    email?: string;
    age?: number;
    gender?: "MALE" | "FEMALE" | "OTHER";
    profession?: string;
    city?: string;
    bio?: string;
    profileImage?: string;
}

export const updateUserProfile = async (
    id: number,
    data: UpdateUserProfileInput
) => {
    return prisma.user.update({
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