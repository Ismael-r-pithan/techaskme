import { prisma } from '../../../database/prismaClient';
import { ICreateAskDTO } from '../dtos/ICreateAskDto';

export class AsksRepositories {
    async findAll() {
        return prisma.asks.findMany({
            orderBy: [
                {
                    created_at: 'desc',
                },

            ],
            include: {
                user: true
            }
        });
    }

    async save({ userId, description }: ICreateAskDTO) {
        return prisma.asks.create({
            data: {
                user_id: userId,
                description,
            }
        });
    }

    async asksByUser(userId: string) {
        return prisma.asks.count({
            where: {
                user_id: userId
            }
        });
    }

    async showAsksByUser(userId: string) {
        return prisma.asks.findMany({
            where: {
                user_id: userId
            }
        })
    }

    async askBelongesUser(userId: string, askId: string) {
        const belonge = await prisma.asks.findFirst({
            where: {
                user_id: userId,
                id: askId
            }
        })

        if (belonge) {
            return true;
        }

        return false;
    }
}