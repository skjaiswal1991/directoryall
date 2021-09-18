import { Request, Response, Router } from "express";
import Auth from "../../../server/middlewares/authMiddlewares/auth.base.middlware"
import {validationResult} from "express-validator";
import error_handler from "../../../server/middlewares/error.handler.class";
import YelpApi from "../../../bussinessLogic/yelp.bussiness";
class Yelp {
  private _router: Router;
  constructor(router: Router) 
  {
    this._router = router;
    //this._router.post("/", Auth.base,this.getYelpUserData);
    this._router.post("/", this.getYelpUserData);
    this._router.put("/", this.addYelpGetReview);
    // this._router.post("/autosearch/", this.getYelpSearchData);
  }

  getYelpUserData = async(req:Request,res:Response)=>
  {
      const yelp = new YelpApi();

      yelp.getAllReviewAndRating(req.body).then((results)=>{
        console.log(results)
        if(results){
          res.status(200).send({status:"success",result:results});
        }else{
          res.status(301).send({ status: "error", result: results });
        }
       
      })
        
  }

  addYelpGetReview = async (req: Request, res: Response) =>
  {
    const yelp = new YelpApi();
    // console.log(req.query)
    // yelp.getAllAutoSearch(req.query).then((results)=>{

    //   if(results){
    //     res.status(200).send({status:"success",result:results});
    //   }else{
    //     res.status(301).send({status:"error",result:results});
    //   }
    // }
    // )
    yelp.getAllReview(req.query.businessId).then((results) => {
      //let rData = {rating:results.rating,review:results.review_count}
      //  console.log(typeof results)
      res.status(200).send(results);
    })
  }

 
}

module.exports = Yelp;
