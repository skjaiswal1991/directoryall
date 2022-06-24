import { Request, Response, Router } from "express";
import Auth from "../../../server/middlewares/authMiddlewares/auth.base.middlware"
import { validationResult } from "express-validator";
import error_handler from "../../../server/middlewares/error.handler.class";
import GooglemapApi from "../../../bussinessLogic/googlemap.bussiness";
class Googlemap {
  private _router: Router;
  constructor(router: Router) {
    this._router = router;
    //this._router.post("/", Auth.base,this.getYelpUserData);
    // this._router.post("/", this.getHotelUserData);
    this._router.post("/", this.getGoogleMapGetReview);
    // this._router.post("/autosearch/", this.getYelpSearchData);
  }

  getGoogleMapGetReview = async (req: Request, res: Response) => {

    try {

      const Googlemap = new GooglemapApi();
      //console.log(req.body)

      let urldata = req.body.url.split('/place/')
      //console.log(urldata);
      let businessName = urldata[1].split('/@')[0]
      //console.log("businessName",businessName);
      Googlemap.getAllReviewAndRatingGoogleMap(req.body, businessName)
        .then((response) => {

          let BusineResult = {
            'url': req.body.url,
            'address': response[0].formatted_address,
            'name': response[0].name,
            'rating': response[0].rating,
            'review': response[0].user_ratings_total

          }
          //console.log(BusineResult);
          if (response !== 'undefiend') {

            res.status(200).send({
              status: "success",
              result: BusineResult
            });
          }

        })
        .catch(error =>
          res.status(301).send({ status: "error", result: new Error("Please Enter valid URl") })
        )
    }
    catch (error) {
      res.status(301).send({ status: "error", result: new Error("Please Enter valid URl") });
    }
  }
}

module.exports = Googlemap;
