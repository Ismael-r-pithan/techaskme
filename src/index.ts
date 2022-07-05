import express, { Response, Request } from "express";
import session from 'express-session';
import dotenv from "dotenv";

import userRoutes from "./modules/users/routes/user.routes";
import authRoutes from "./modules/auth/routes/auth.routes";
import asksRoutes from "./modules/asks/routes/asks.routes";
import likeRoutes from "./modules/likes/routes/like.routes";
import resolutionRoutes from "./modules/resolutions/routes/resolution.routes";
import { isAuth } from "./middlewares/isAuth";



dotenv.config({
    path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env"
})


const app = express();


app.use(session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.SECURITY_COOKIE == 'true' ? false : true }
}));


app.use(express.static('public'));
app.set('views', './src/views')
app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: true }));



app.get('/', (request: Request, response: Response) => {
    response.redirect('/asks');
})
app.get('/signIn', (request: Request, response: Response) => {
    response.render('signIn');
})
app.get('/register', (request: Request, response: Response) => {
    response.render('register');
})

app.use('/asks', asksRoutes);


app.use('/users', userRoutes);
app.use('/likes', likeRoutes);
app.use('/resolutions', resolutionRoutes);
app.use(authRoutes);



const port = process.env.PORT || 3000;



app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
})