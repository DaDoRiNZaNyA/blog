import { body } from "express-validator";

export const registerValidation = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Пароль минимум 5 символов").isLength({min: 5}),
    body('fullName', "Имя минимум 3 буквы").isLength({min: 3}),
    body('avatarUrl', "Неверная ссылка на аватарку").optional().isURL(),
]