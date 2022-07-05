import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';



async function SendMail(email: string, name: string, emailVerify: string) {

    let transporter = nodemailer.createTransport(smtpTransport({

        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: process.env.VERSION == 'production' ? true : false,
        requireTLS: process.env.VERSION == 'production' ? false : true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }));

    await transporter.sendMail({
        from: `TechAskMe <${process.env.EMAIL}>`, // sender address
        to: email, // receiver (use array of string for a list)
        subject: `Bem vindo(a) ${name}`, // Subject line
        html: `<a href=http://localhost:3000/users/confirm/${emailVerify}>Confirme Aqui</a>`

    });

}
export { SendMail }