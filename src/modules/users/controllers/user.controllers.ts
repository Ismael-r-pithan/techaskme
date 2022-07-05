import { Request, Response } from "express";
import { UserValidator } from "../validators/user.validators";
import { ICreateUserDTO } from '../dtos/ICreateUserDto';
import { UserRepositories } from '../repositories/user.repositories';
import { SendMail } from "../../../services/SendMail";
import { AsksRepositories } from '../../asks/repositories/asks.repositories';
import { ResolutionRepositories } from '../../resolutions/repositories/resolution.repositories';
import { EnjoyRepositories } from '../../likes/repositories/enjoy.repositories';

export class UserController {


    async create(request: Request, response: Response) {

        try {

            const userRepositories = new UserRepositories();
            const validation = UserValidator.validate(request.body as ICreateUserDTO, { abortEarly: false });
            const userDTO = request.body as ICreateUserDTO;
            let errors: any = new Object();
            const emailExists = await userRepositories.emailExists(userDTO.email);

            if (emailExists) {
                errors = { email: "Email já existe" }
            }

            if (validation.error) {
                for (const error of validation.error.details) {
                    errors[error.path[0]] = error.message;
                }
            }

            if (Object.keys(errors).length > 0) {
                console.log('Log: UserController - Object.keys');
                return response.render('register', { errors: errors });
            }


            const user = await userRepositories.save(request.body as ICreateUserDTO);
            console.log(user.email);
            await SendMail(user.email, user.name, user.emailVerify);
            response.render('signIn');

        } catch (error) {
            console.log(`Log: UserController - create Catch error: ${error}`);
            return response.render("error");
        }
    }



    async verifyUserMail(request: Request, response: Response) {
        const { emailVerify } = request.params;
        const userRepository = new UserRepositories()
        await userRepository.emailVerify(emailVerify);

        response.redirect('/');
    };



    async profile(request: Request, response: Response) {
        // NOME
        // DATA ENTRADA NA PLATAFORMA
        const userRepository = new UserRepositories();

        const userSession = request.session?.data;
        const user = await userRepository.findById(userSession.userId);

        // QUANTIDADE DUVIDAS QUE CRIOU
        const asksRepository = new AsksRepositories();
        const totalAsks = await asksRepository.asksByUser(userSession.userId);
        // QUANTIDAD DE RESPOSTAS
        const resolutionRepository = new ResolutionRepositories();
        const totalResolutions = await resolutionRepository.resolutionByUser(userSession.userId);

        // NUMERO DE LIKES
        // NUMERO DE DESLIKES
        const enjoyRepository = new EnjoyRepositories();
        const likes = await enjoyRepository.likesByUser(userSession.userId);
        const deslikes = await enjoyRepository.deslikesByUser(userSession.userId);

        // LISTA DE DUVIDAS CRIADAS PELO USUARIO
        const asksUser = await asksRepository.showAsksByUser(userSession.userId);

        response.render('profile', { user, totalAsks, totalResolutions, likes, deslikes, asksUser });
    }
}