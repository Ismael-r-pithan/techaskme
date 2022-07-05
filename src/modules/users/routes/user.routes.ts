import { Router } from 'express';
import { isAuth } from '../../../middlewares/isAuth';
import { UserController } from '../controllers/user.controllers';

const routes = Router();

const userController = new UserController();

routes.get('/confirm/:emailVerify', userController.verifyUserMail);

routes.post('/', userController.create);

routes.get('/profile', isAuth, userController.profile);

export default routes;