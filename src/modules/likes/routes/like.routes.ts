import { Router } from "express";
import { LikeController } from "../controllers/like.controllers";

const routes = Router();

const likeController = new LikeController();

routes.post('/', likeController.enjoy)

export default routes;