import { Router } from "express";
import { isAuth } from "../../../middlewares/isAuth";
import { AsksController } from '../controllers/asks.controllers';
import multer from "multer";
import multerConfig from "../../../services/Upload";

const routes = Router();
const asks = new AsksController();
const uploadImg = multer(multerConfig);

routes.get('/new-ask', isAuth, asks.newAsk);

routes.get('/', asks.showAsks);


routes.post('/', isAuth, uploadImg.single("picture"), asks.createAsk);


export default routes;