import { Request, Response, Router } from "express";
import Auth from "../../../server/middlewares/authMiddlewares/auth.base.middlware"
import {validationResult} from "express-validator";
import error_handler from "../../../server/middlewares/error.handler.class";
import ZomatoApi from "../../../bussinessLogic/zomato.bussiness";
import { parse } from "path";

class Zomato {
  private _router: Router;
  constructor(router: Router) {
    this._router = router;
    //this._router.post("/", Auth.base,this.getZomatoRatings);
    this._router.post("/", this.getZomatoRatings);
}

public getZomatoRatings=async (req:Request,res:Response, next)=>{
    const ZomatoBussiness = new ZomatoApi();
    //console.log("Here in zomato rateing part");
    //console.log(req.body)
    try{
      const data:any =  await ZomatoBussiness.getRestorantListOnCords(req.body.lat,req.body.lng,req.body.url)
       // console.log("getZomatoRatings is ready to sended");
        ZomatoBussiness.filterData(data.data,req.body.url)
        .then((respone)=>{
          //console.log("zamato response",respone);
          let newReview = []
        if(respone)
           newReview = [
                            {...respone['restaurant'],
                            zamato_review:respone['restaurant'].user_rating,
                            user_rating:respone['restaurant'].user_rating.aggregate_rating,
                            user_review:respone['restaurant'].user_rating.votes,
                          }]
                      
           //res.status(200).send(newReview);
           if(newReview){
            res.status(200).send({status:"success",result:newReview});
          }else{
            res.status(301).send({status:"error",result:newReview});
          }
          })
 
       }catch(error){
       // console.log('here in error part');
        return next(new error_handler(422,'something whent wrong!!',error));
      }
  }
}

module.exports = Zomato;
