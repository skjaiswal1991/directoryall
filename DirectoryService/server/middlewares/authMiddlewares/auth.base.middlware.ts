import { Request, Response, NextFunction, RequestHandler } from "express";
import * as jwt from "jsonwebtoken";
import error_handler from "../../../server/middlewares/error.handler.class";
interface UserObject {
  user: Object;
  role: String;
  iat: Number;
  exp: Number;
}

const AuthMiddleware = {
  base: (req: Request, res: Response, next: NextFunction) => {
    if (Boolean(req.headers.authorization)) {
      const token = req.headers.authorization;
      const tokenArray = token.split(" ");
      const accsessToken = tokenArray[1];
      jwt.verify(accsessToken, process.env.SESSION_SECRATE, function(
        err,
        decodedToken
      ) {
        if (err) {
          return next(new error_handler(403,err,err));
        } else {
         // console.log(decodedToken);
         console.log("here in auth middle ware .................."); 
         const userObj = decodedToken;
          const lastBody = req.body;
          req.body = Object.assign(lastBody, {
            user: userObj,
          });
          next();
        }
      });
    } else {
      console.log("error in auth middle ware .................."); 
      return next(new error_handler(403,"unauthorized","unauthorized"));
     
    }
  }
};
export default AuthMiddleware;
