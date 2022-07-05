import { Response, Request } from 'express';
import { ICreateResolutionDTO } from '../dtos/ICreateResolutionDto';
import { ResolutionRepositories } from '../repositories/resolution.repositories';
import { AsksRepositories } from '../../asks/repositories/asks.repositories';
import { ICreateSuperLike } from '../dtos/ICreateSuperLike';

export class ResolutionController {

    async create(request: Request, response: Response) {
        console.log(`Log:  ResolutionController -- Method: Create`);
        const resolution = request.body as ICreateResolutionDTO;
        const resolutionRepository = new ResolutionRepositories();
        const userId = request.session.data.userId;
        const resolutionDTO: ICreateResolutionDTO = {
            ...resolution,
            user_id: userId
        }
        await resolutionRepository.save(resolutionDTO);
        return response.redirect('/');
    }

    async help(request: Request, response: Response) {
        const { ask_id } = request.params;
        response.render('help', { ask_id });
    }

    async showResolutions(request: Request, response: Response) {
        const { ask_id } = request.params;
        const userId = request.session.data.userId;

        const resolutionRepository = new ResolutionRepositories();
        const askRepository = new AsksRepositories();

        const askBelongeUser = await askRepository.askBelongesUser(userId, ask_id);
        const resolution = await resolutionRepository.showResolutionByAsk(ask_id);
        const resolutions = resolution == [] ? false : resolution

        response.render('resolutions', { resolutions, askBelongeUser, ask_id });
    }

    async superLike(request: Request, response: Response) {
        const { resolutionId, ask_id } = request.body;
        const resolutionRepository = new ResolutionRepositories();
        await resolutionRepository.updateSuperLike(ask_id);
        await resolutionRepository.superLike(resolutionId);

        response.redirect('/');
    }
}