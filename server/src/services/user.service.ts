import { prisma } from '../lib/prisma.js';

export interface CreateUserInput {
    email: string;
    name?: string;
}

export class UserService {
    static async getAllUsers() {
        return prisma.user.findMany();
    }

    static async getUserById(id: string) {
        return prisma.user.findUnique({
            where: { id: id as any },
        });
    }

    static async createUser(data: CreateUserInput) {
        return prisma.user.create({
            data: data as any,
        });
    }
}