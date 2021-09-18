import { body } from "express-validator";

const BussimessValidator =  [
    body("email").notEmpty().withMessage("Email should not be empty ...")
    .isString().withMessage("Email must be a string...")
    .isEmail().withMessage("Email must be in valid formate..."),
    body("title").notEmpty().withMessage("title should not be empty ...")
    .isString().withMessage("Password must be a string...")
]
export default BussimessValidator;