import { Response, Request } from 'express';
import session from 'express-session';
import { AsksRepositories } from '../repositories/asks.repositories';
import { ICreateAskDTO } from '../dtos/ICreateAskDto';
import { ImagesRepositories } from '../repositories/images.repositories';
import { ICreateImageDTO } from '../dtos/ICreateImageDto';
import { S3Provider } from '../../../services/S3Provider';

export class AsksController {

    async showAsks(request: Request, response: Response) {
        const asksRepository = new AsksRepositories();
        const user = request.session?.data;

        const asks = await asksRepository.findAll();
        response.render('home', { userSession: user, asks });
    }

    async newAsk(request: Request, response: Response) {

        const userId = request.session.data.userId;
        response.render('new-ask', { userId });
    }

    async createAsk(request: Request, response: Response) {
        const askDTO = request.body as ICreateAskDTO;
        const askRepository = new AsksRepositories();
        const ask = await askRepository.save(askDTO);

        const imageRepository = new ImagesRepositories();
        const askImg = request.file?.filename ?? "";


        const s3Provider = new S3Provider();
        if (askImg != "") {
            const images3 = await s3Provider.save(askImg);
            const askImgDTO: ICreateImageDTO = {
                askId: ask.id,
                imageUrl: askImg,
                urls3: `${process.env.AWS_BUCKET_URL}/${images3}`
            }
            if (askImgDTO) {
                await imageRepository.save(askImgDTO);
            }
        }

        response.redirect('/');
    }

}