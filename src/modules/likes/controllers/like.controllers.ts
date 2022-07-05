import { Response, Request } from 'express';
import { IEnjoyDTO } from '../dtos/IEnjoyDto';
import { EnjoyRepositories } from '../repositories/enjoy.repositories';

export class LikeController {
    async enjoy(request: Request, response: Response) {
        console.log('Log: LikeController -- Method: Enjoy');
        const enjoy = request.body as IEnjoyDTO;
        const enjoyRepository = new EnjoyRepositories();
        await enjoyRepository.create(enjoy);
        response.redirect('/');
    }
}