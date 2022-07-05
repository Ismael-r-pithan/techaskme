import { prisma } from '../../../database/prismaClient';
import { IEnjoyDTO } from '../dtos/IEnjoyDto';
export class EnjoyRepositories {
    async create(enjoy: IEnjoyDTO) {
        console.log('Log: EnjoyRepositories -- Method: create')

        const invalidLike = await prisma.like.findFirst({
            where: {
                user_id: enjoy.user_id,
                enjoy: Boolean(enjoy.enjoy)
            }
        })

        if (invalidLike) {
            return;
        }

        await prisma.like.create({
            data: {
                ...enjoy,
                enjoy: Boolean(enjoy.enjoy)
            }
        });
    }

    async likesByUser(userId: string) {
        return prisma.like.count({
            where: {
                ask_id: userId,
                enjoy: true
            }
        });
    }

    async deslikesByUser(userId: string) {
        return prisma.like.count({
            where: {
                ask_id: userId,
                enjoy: false
            }
        });
    }

}