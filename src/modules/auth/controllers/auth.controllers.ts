import { Request, Response } from 'express';
import { IAuthUserDTO } from '../dtos/IAuthUserDto';
import { AuthRepositories } from '../repositories/auth.repositories';
import bcrypt from 'bcrypt';
import session from 'express-session';

export class AuthController {

    async login(request: Request, response: Response) {
        console.log('Log: AuthController -- Method: login')
        const authDTO = request.body as IAuthUserDTO;
        let errors: any = new Object();

        const authRepository = new AuthRepositories();
        const user = await authRepository.login(authDTO.email);

        if (!user) {
            errors = { email: "Email not found" }
        }

        const passwordMath = await bcrypt.compare(authDTO.password, user?.password ?? "");

        if (!passwordMath) {
            errors = { password: "Invalid password" }
        }

        if (Object.keys(errors).length > 0) {
            console.log('Log: AuthController -- Object.keys');
            return response.render('signIn', { errors: errors });
        }

        const userSession = {
            loggedIn: true,
            userId: user?.id,
            username: user?.name,
            status: user?.ativo,
        }

        request.session.data = userSession;
        return response.redirect("/");
    }

    async logout(request: Request, response: Response) {
        request.session.destroy(err => {
            console.log(err);
        });
        response.redirect('/');
    }
}