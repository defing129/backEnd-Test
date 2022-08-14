import { body } from 'express-validator';



export const postCreateValidation = [
    body('nickname', 'Введите никнейм').isLength({ min: 3 }).isString(),
    body('real_name', 'Настоящее имя').isLength({min: 3 }).isString(),
    body('origin_description', 'Описание происхождения').isLength({ min: 3 }).isString(),
    body('superpowers', 'Сверхспособности').isLength({ min: 3 }).isString(),
    body('catch_phrase', 'Фраза').isLength({ min: 3 }).isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];