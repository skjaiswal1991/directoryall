import { Request, Response, Router } from "express";
import error_handler from "../../../server/middlewares/error.handler.class";
import * as jwt from "jsonwebtoken";
import {validationResult} from "express-validator";
import login_validator from "../../../server/middlewares/validators/login.validator"
import {AuthBussiness} from "../../../bussinessLogic/auth.business";

class loginController {
    constructor(router:Router){
        router.post('/',login_validator,this.loginMethod);
    }

    loginMethod = async (req:Request,res:Response,next) =>{
        const errors = validationResult(req);
        console.log(errors) 
        if (!errors.isEmpty())
            return next(new error_handler(422,'something whent wrong!!',errors));
        try{
                const LoginLogic =  new AuthBussiness() 
                const resp = await LoginLogic.handleLogin(req.body)
                console.log('Object Entity');
                console.log(Object.entries(resp))
                //console.log(Object.values(resp))
                const Person = Object.values(resp);
                if(Person.length === 1){
                   const tokens = await LoginLogic.createTokens(Person); 
                   res.status(200).send({message:'logged in success fully',tokens})
                }else{
                    next(new error_handler(503,'Login and password are wrong!',''));
                }      
                
        }catch(err){
               
        }    
    }
}

module.exports = loginController;