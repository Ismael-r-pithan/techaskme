import { prisma } from '../../../database/prismaClient';
import { ICreateImageDTO } from '../dtos/ICreateImageDto';
export class ImagesRepositories {

    async save({ askId, imageUrl, urls3 }: ICreateImageDTO) {
        await prisma.image.create({
            data: {
                url: imageUrl,
                ask_id: askId,
                urlImg: urls3

            }
        })
    }
}