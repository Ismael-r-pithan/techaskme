import { prisma } from '../../../database/prismaClient';

export class AuthRepositories {


    async login(email: string) {
        return prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: "insensitive"
                }
            }
        });

    }

}