import { prisma } from "../../../database/prismaClient";
import { ICreateResolutionDTO } from '../dtos/ICreateResolutionDto';
import { ICreateSuperLike } from '../dtos/ICreateSuperLike';
import { AsksRepositories } from '../../asks/repositories/asks.repositories';

export class ResolutionRepositories {
    async save(resolution: ICreateResolutionDTO) {
        return prisma.resolution.create({
            data: {
                ...resolution
            }
        })
    }

    async resolutionByUser(userId: string) {
        return prisma.resolution.count({
            where: {
                user_id: userId
            }
        });
    }

    async showResolutionByAsk(askId: string) {
        return prisma.resolution.findMany({
            where: {
                ask_id: askId
            },
            include: {
                user: true
            },
            orderBy: [
                {
                    superlike: 'desc',
                    created_at: 'desc',
                },

            ],
        });
    }

    async superLike(resolutionId: string) {
        await prisma.resolution.update({
            where: {
                id: resolutionId
            },
            data: {
                superlike: true
            }
        });
    }

    async availableSuperLike(resolutionId: string) {

        const available = await prisma.resolution.findFirst({
            where: {
                id: resolutionId,
                superlike: true
            }
        });

        if (available) {
            return true;
        }

        return false;
    }


    async updateSuperLike(askId: string) {
        const existsSuperLike = await prisma.resolution.findFirst({
            where: {
                ask_id: askId,
                superlike: true
            }
        });

        if (existsSuperLike) {
            prisma.resolution.update({
                where: {
                    id: existsSuperLike.id,
                },
                data: {
                    superlike: false
                }
            })
        }

    }


}