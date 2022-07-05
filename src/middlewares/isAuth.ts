import { NextFunction, Request, Response } from "express";
import session from 'express-session';

function isAuth(request: Request, response: Response, next: NextFunction): void {

    const userStatus = request.session?.data?.status;

    if (userStatus) {
        console.log("Log: Middlewares -- isAuth");
        next();
    } else {
        console.log("Log: Middleware -- Nao autenticado")
        response.render('signIn');
    }
}


export {
    isAuth
}