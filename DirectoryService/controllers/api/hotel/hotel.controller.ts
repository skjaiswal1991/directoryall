import { Request, Response, Router } from "express";
import Auth from "../../../server/middlewares/authMiddlewares/auth.base.middlware"
import { validationResult } from "express-validator";
import error_handler from "../../../server/middlewares/error.handler.class";
import HotelApi from "../../../bussinessLogic/hotel.bussiness";
class Hotel {
  private _router: Router;
  constructor(router: Router) {
    this._router = router;
    //this._router.post("/", Auth.base,this.getYelpUserData);
    // this._router.post("/", this.getHotelUserData);
    this._router.post("/", this.getHotelGetReview);
    // this._router.post("/autosearch/", this.getYelpSearchData);
  }

  getHotelGetReview = async (req: Request, res: Response) => {
    try {


      const hotel = new HotelApi();
      //console.log(req.body)
      let url = req.body.url.split(/[?#]/)[0]
      // myString.replace(/\D/g,'');
      //   console.log(url)
      let urldata = url.split('/ho')
      var desired = urldata[urldata.length - 1].replace(/[^\w\s]/gi, '')
     // console.log(parseInt(desired))
      // const responseData = {

      //   "name": "citizenM London Shoreditch",
      //   "url": "https://uk.hotels.com/ho510497376/?pa=1&tab=description&ZSX=0&SYE=3&q-room-0-children=0&q-room-0-adults=2#maps",
      //   "address": "6 Holywell Lane, London, England, EC2A 3ET, United Kingdom",
      //   "user_rating": 4.6,
      //   "user_review": 738

      // }
      // res.status(200).send({ status: "success", result: responseData });
      hotel.getAllReviewAndRating(parseInt(desired))
        .then((response) => {
          //console.log(response)
          // console.log(response['data']['body']['guestReviews']) 

          if (response['result'] == 'OK') {

            let { name } = response['data']['body']['propertyDescription']
            let { fullAddress } = response['data']['body']['propertyDescription']['address']
            let { total, rating } = response['data']['body']['guestReviews']['brands']
            // console.log(total,rating)
            // rating = parseFloat(rating) * 2
            const responseArray = { name, url: req.body.url, address: fullAddress, user_rating: rating, user_review: total }
            res.status(200).send({ status: "success", result: responseArray });
          }

          else {

            res.status(301).send({ status: "error", result: new Error("Please check the location and url") });
          }

        })
        .catch(error => {
          res.status(301).send({ status: "error", result: new Error("Please check and url") });
        })
    }
    catch (error) {
      res.status(301).send({ status: "error", result: new Error("Please Enter valid URl") });
    }

  }


  // getYelpUserData = async(req:Request,res:Response)=>
  // {
  //     const yelp = new YelpApi();

  //     yelp.getAllReviewAndRating(req.body).then((results)=>{

  //       if(results){
  //         res.status(200).send({status:"success",result:results});
  //       }else{
  //         res.status(301).send({status:"error",result:results});
  //       }

  //     })

  // }

  // addYelpGetReview =  async (req:Request,res:Response) =>
  // {
  //   const yelp = new YelpApi();
  //   // console.log(req.query)
  //   // yelp.getAllAutoSearch(req.query).then((results)=>{

  //   //   if(results){
  //   //     res.status(200).send({status:"success",result:results});
  //   //   }else{
  //   //     res.status(301).send({status:"error",result:results});
  //   //   }
  //   // }
  //   // )
  //   yelp.getAllReview(req.query.businessId).then((results)=>{
  //     //let rData = {rating:results.rating,review:results.review_count}
  //   //  console.log(typeof results)
  //     res.status(200).send(results);
  //   })
  // }


}

module.exports = Hotel;
