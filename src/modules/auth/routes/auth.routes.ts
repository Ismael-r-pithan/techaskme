import { Router } from "express";
import { AuthController } from '../controllers/auth.controllers';

const authController = new AuthController();
const routes = Router();

routes.post('/login', authController.login);

routes.get('/logout', authController.logout);

export default routes;