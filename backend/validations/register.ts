import { body } from "express-validator";

export const registerValidation = [
  body("fullname", "Введите имя")
    .isString()
    .isLength({ min: 2, max: 40 })
    .withMessage("Допустимое количество символов в имени от 2 до 40"),
  body("username", "Укажите логин")
    .isString()
    .isLength({ min: 2, max: 40 })
    .withMessage("Допустимое количество символов в логине от 2 до 40"),
  body("email", "Введите E-Mail")
    .isEmail()
    .withMessage(`Неверный E-Mail`)
    .isLength({ min: 10, max: 55 })
    .withMessage("Допустимое количество символов в почте от 10 до 55"),
  body("password", "Введите пароль")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Минимальная длина пароля — 6 символов")
    .matches(/^(?=\S*?[a-z])(?=\S*?[A-Z])(?=\S*?\d)(.){6,}$/)
    .withMessage("В пароле должны быть буквы обоих регистров и цифры")
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error("Пароли не совпадают");
      } else {
        return value;
      }
    }),
];
