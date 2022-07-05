import { Router } from 'express';
import { isAuth } from '../../../middlewares/isAuth';
import { ResolutionController } from '../controllers/resolution.controllers';

const routes = Router();

const resolutionController = new ResolutionController();

routes.post('/', isAuth, resolutionController.create);

routes.post('/superlike', isAuth, resolutionController.superLike);

routes.get('/help/:ask_id', isAuth, resolutionController.help);
routes.get('/:ask_id', isAuth, resolutionController.showResolutions);

export default routes;