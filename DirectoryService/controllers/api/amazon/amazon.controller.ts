import { Request, Response, Router } from "express";
import Auth from "../../../server/middlewares/authMiddlewares/auth.base.middlware"
import { validationResult } from "express-validator";
import error_handler from "../../../server/middlewares/error.handler.class";
import AmazonApi from "../../../bussinessLogic/amazon.bussiness";
class Amazon {
  private _router: Router;
  constructor(router: Router) {
    this._router = router;
    //this._router.post("/", Auth.base,this.getYelpUserData);
    // this._router.post("/", this.getHotelUserData);
    this._router.post("/", this.getAmazonGetReview);
    // this._router.post("/autosearch/", this.getYelpSearchData);
  }

  getAmazonGetReview = async (req: Request, res: Response) => {
    try {


      const amazon = new AmazonApi();
      //console.log(req.body)
      let url = req.body.url.split(/[?#]/)[0]
      // myString.replace(/\D/g,'');

      let urldata = url.split('/dp/')
      //console.log(urldata)
      var desired = urldata[urldata.length - 1].replace(/[^\w\s]/gi, '')
      //console.log(desired)
      // const responseData = {

      //   "name": "citizenM London Shoreditch",
      //   "url": "https://uk.hotels.com/ho510497376/?pa=1&tab=description&ZSX=0&SYE=3&q-room-0-children=0&q-room-0-adults=2#maps",
      //   "address": "6 Holywell Lane, London, England, EC2A 3ET, United Kingdom",
      //   "user_rating": 4.6,
      //   "user_review": 738

      // }
      // res.status(200).send({ status: "success", result: responseData });

      var newData = {
        "title": "Xbox One X 1TB Console NBA 2K20 Special Edition Bundle White",
        "url": "https://www.amazon.com/dp/B084QNGMJ9",
        "img": "https://images-na.ssl-images-amazon.com/images/I/51vtyTPEJ6L._AC_SY879_.jpg",
        "user_rating": "4.7",
        "user_review": 47
      }
      res.status(200).send({ status: "success", result: newData });
      // amazon.getAllReviewAndRating(desired)
      //   .then((response) => {
      //     console.log(response)
      //     console.log(response['result'])
      //     const { reviews: { rating, total_reviews }, title, main_image } = response['result'][0];
      //     const responseArray =
      //     {
      //       title,
      //       url: req.body.url,
      //       img: main_image,
      //       user_rating: rating,
      //       user_review: total_reviews
      //     }
      //     res.status(200).send({ status: "success", result: responseArray });

      //   })
      //   .catch(error => {
      //     res.status(301).send({ status: "error", result: new Error("Please check and url") });
      //   })
    }
    catch (error) {
      res.status(301).send({ status: "error", result: new Error("Please Enter valid URl") });
    }

  }

}

module.exports = Amazon;
