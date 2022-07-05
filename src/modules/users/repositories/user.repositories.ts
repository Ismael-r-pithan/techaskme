import { prisma } from '../../../database/prismaClient';
import { ICreateUserDTO } from '../dtos/ICreateUserDto';
import bcrypt from 'bcrypt';
import crypto from "crypto";

export class UserRepositories {

    async save({ name, email, password }: ICreateUserDTO) {

        const hashPassword = await bcrypt.hash(password, 10);
        const emailVerify = crypto.randomBytes(4).toString('hex');
        return prisma.user.create({
            data: {
                name,
                email,
                emailVerify,
                password: hashPassword
            }
        });
    }

    async emailExists(email: string) {
        const user = await prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: "insensitive"
                }
            }
        });

        if (user) {
            return true;
        }

        return false;
    }

    async emailVerify(emailVerify: string) {
        const user = await prisma.user.findFirst({
            where: {
                emailVerify,
            }
        });

        if (user) {
            return prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    ativo: true,
                }
            });
        }

        return false;
    }

    async findById(user_id: string) {
        return prisma.user.findFirst({
            where: {
                id: user_id
            }
        })
    }


}
