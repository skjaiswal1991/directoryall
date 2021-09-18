import { Request, Response, Router } from "express";
import Auth from "../../../server/middlewares/authMiddlewares/auth.base.middlware"
import {validationResult} from "express-validator";
import error_handler from "../../../server/middlewares/error.handler.class";
import bussiness_validator from "../../../server/middlewares/validators/bussiness.validator"
import UserObject from "../../../bussinessLogic/user.bussiness";
import ReviewsObject from "../../../bussinessLogic/reviews.bussiness";


class Reviews {

  private _router: Router;
  static tokenData :any;
  static plane_cat_array:any;
  static plane_name_array:any;
  
  constructor(router: Router) {
    const reviewsObj = new ReviewsObject();
    const userObject = new UserObject();
    this._router = router;
    // this._router.post("/", this.addBussinessReview);
    this._router.post("/", this.getBussinessReview);
  }


  addBussinessReview = (req: Request, res: Response) => {

  }

  getBussinessReview = (req: Request, res: Response, next)=>{
   
    const reviewsObj = new ReviewsObject()
    console.log('Reviews data')
   // console.log(req.body);
        //const id = req.body;
       // console.log(req.body.businessId);
    reviewsObj.find((error, respon) => {
          if(error){
            new error_handler(500,'something whent wrong!!',error)
          }
         // console.log(respon)
          // respon.map((rev)=>{

          // })

            res.status(200).send(respon);
        },req.body,true) 
        
    
  } 

  
}

module.exports = Reviews;
