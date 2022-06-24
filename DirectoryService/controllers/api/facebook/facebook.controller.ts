import { Request, Response, Router } from "express";
import Auth from "../../../server/middlewares/authMiddlewares/auth.base.middlware"
import {validationResult} from "express-validator";
import error_handler from "../../../server/middlewares/error.handler.class";

class Facebook {
  private _router: Router;
  constructor(router: Router) {
    this._router = router;
    this._router.post("/", Auth.base,this.getFacebookUserData);
  }

  getFacebookUserData = (req:Request,res:Response)=>{
      //console.log(req.body);
  } 
}
module.exports = Facebook;
