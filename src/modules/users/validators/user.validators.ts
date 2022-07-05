import Joi from 'joi';

const passPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[a-zA-Z0-9\\S]{8,}$";

const UserValidator = Joi.object({
    email: Joi.string().email().trim().lowercase().required().messages({
        "string.email": "Não é um email válido",
        "string.empty": "O email é obrigatório"
    }),

    name: Joi.string().min(3).max(50).trim().required().messages({
        "string.empty": "O nome é obrigatório",
        "string.min": "O nome deve ter pelo menor 3 letras",
        "string.max": "O nome não pode passar de 50 letras"
    }),

    password: Joi.string().pattern(new RegExp(passPattern)).messages({
        "string.empty": "O password é obrigatório",
        "string.pattern.base": "Password precisa de pelo menos 8 caracteres, sendo 1 letra minúscula, 1 maiúscula, 1 número e um caracter especial."
    }),
})

export { UserValidator }