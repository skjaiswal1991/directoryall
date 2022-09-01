import { Request, Response, Router } from "express";
import Auth from "../../../server/middlewares/authMiddlewares/auth.base.middlware"
import {validationResult} from "express-validator";
import error_handler from "../../../server/middlewares/error.handler.class";
import bussiness_validator from "../../../server/middlewares/validators/bussiness.validator"
import BussinesObject from "../../../bussinessLogic/bussiness.bussiness"; 
import ReviewObject from '../../../bussinessLogic/reviews.bussiness'
class Bussiness {

  private _router: Router;
  static tokenData :any;
  static plane_cat_array:any;
  static plane_name_array:any;
  
  constructor(router: Router) {
    const multerUpload = new BussinesObject();

    this._router = router;

    this._router.get("/", Auth.base, this.getBussiness);
    // this._router.patch("/", Auth.base,this.updateABussiness); 
    this._router.post("/", Auth.base, bussiness_validator, this.addOneBussiness);
    this._router.get("/:id",Auth.base,this.getCovidComplance);
    this._router.put("/:id", Auth.base, this.getBussinessbySlug);

 
   // this._router.post("/images/",this.addBussinessImages);
    // AnAuthrise Section
    // this._router.get("/", this.getBussiness);
    this._router.patch("/", this.updateABussiness);
    // this._router.post("/", this.addBussiness);
    // this._router.get("/:id",Auth.base,this.getBussinessbyId);
    // this._router.put("/slug/", this.getBussinessbySlug);
    // this._router.put("/review/", this.addBussinessReviews);
    // this._router.patch("/", Auth.base, this.updateCovidComplance);



    this._router.post(
      "/upload",
      multerUpload.uploadMular().single("photo"),
      this.upload
    );
  
  }

  public addReviewForCovidCompalance = async (req:Request,res:Response) =>{
    
  }

  public updateCovidComplance= async (req:Request, res:Response) =>{

  }

  public getCovidComplance = async (req:Request,res:Response)=>{

  }  
  
  public updateABussiness = async (req:Request,res:Response) =>{  
    console.log("here in patch business .................."); 
    //
    console.log(req.body)
    const bussinesObject = new BussinesObject();
    if("md5Image" in req.body){
      //console.log(true)
      const {Id, md5Image} = req.body; 
      bussinesObject.findOneAndUpsert(Id,{profilePic:md5Image},(err,results)=>{
           if(err){
            new error_handler(500,'something whent wrong!!',err)
           }
           res.status(200).send(results);
        })
     }

    if ("coverImage" in req.body) {
      
      const { Id, coverImage } = req.body;
      bussinesObject.findOneAndUpsert(Id, { coverPic: coverImage }, (err, results) => {
        if (err) {
          console.log(err)
          new error_handler(500, 'something whent wrong!!', err)
        }
        //console.log(results);
        res.status(200).send(results);
      })
    }

     if("subQuote" in req.body){
      const {Id, subQuote} = req.body; 
      bussinesObject.findOneAndUpsert(Id,{subQuote:subQuote},(err,results)=>{
           if(err){
            new error_handler(500,'something whent wrong!!',err)
           }
           res.status(200).send(results);
        })
     }

     if("mainQuote" in req.body){
      const {Id, mainQuote} = req.body; 
      bussinesObject.findOneAndUpsert(Id,{mainQuote:mainQuote},(err,results)=>{
           if(err){
            new error_handler(500,'something whent wrong!!',err)
           }
           res.status(200).send(results);
        })  
     }

    if ('dirimage' in req.body) {
      // console.log(req.body);
      const { Id, images } = req.body;
      //console.log(req.body)

      bussinesObject.update(Id, req.body, (err, results) => {
        if (err) {
          console.log(err);
          new error_handler(500, 'something whent wrong!!', err)
        }
        //console.log(results)
        res.status(200).send(results);
      })

    }

    if ('dircategory' in req.body) {

      // console.log(req.body)
      const { Id } = req.body;
      bussinesObject.update(Id, req.body, (error, result) => {
        if (error) {
          console.log(error);
          new error_handler(500, 'something whent wrong!!', error)
        }
        //console.log(result)
        res.status(200).send(result);
      })
    }

    if ('feature' in req.body) {

      //console.log(req.body)
      const { Id } = req.body;
      bussinesObject.update(Id, req.body, (error, result) => {
        if (error) {
          console.log(error);
          new error_handler(500, 'something whent wrong!!', error)
        }
        //console.log(result)
        res.status(200).send(result);
      })
    }

    if ('covidcomplehance' in req.body) {

      //console.log(req.body)
      const { Id } = req.body;
      bussinesObject.update(Id, req.body, (error, result) => {
        if (error) {
          console.log(error);
          new error_handler(500, 'something whent wrong!!', error)
        }
        //console.log(result)
        res.status(200).send(result);
      })
    }

    if('directorysocial' in req.body){
      console.log("directorysocial+++")
      const { Id } = req.body;
      bussinesObject.update(Id, req.body, (error, result) => {
        if (error) {
          console.log(error);
          new error_handler(500, 'something whent wrong!!', error)
        }
      // console.log(result)
        res.status(200).send(result);
      })
    }
    if('directoryupdate' in req.body){
        //console.log("Update working")
        const { Id } = req.body;
      bussinesObject.update(Id, req.body, (error, result) => {
        if (error) {
          console.log(error);
          new error_handler(500, 'something whent wrong!!', error)
        }
       // console.log(result)
        res.status(200).send(result);
      })
    }




  }

  public addOneBussiness = async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return next(new error_handler(422,'something whent wrong!!',errors));
    }else{
      const businessObj =  new BussinesObject();
      // businessObj.createOnlyOne(req.body,(err,result)=>{
        //console.log("request from the API",req.body)
        //debugger;
      let dfdata = req.body;
      req.body.userId = req.body.user.user._id;
      req.body.iat = req.body.user.iat
      req.body.exp = req.body.user.exp 
      //console.log("After changes request from the API",req.body) 

      businessObj.find((err, result) => {
            if( err instanceof Error){
              return next(new error_handler(401,err,err));
            }else{
              //console.log("After saving data",result);
              //console.log(result instanceof Array,result.length)
             
               if( result instanceof Array  &&  result.length == 0){
                //console.log(result instanceof Array  &&  result)
             
                  businessObj.create(req.body,(err,result)=>{
                  if(err){
                    new error_handler(500,'something whent wrong!!',err)
                  }
                  res.status(200).send(result);
                 });
               }else{
                  res.status(403).send(err);
                 //return next(new error_handler(403,"Not Authorised for more then one directory",err));    
               }
            }
        },{userId:`${req.body.user.user._id}`},true);
    }      
  };

  public addBussinessReviews = async (req: Request, res: Response, next) => {

    const reviewsObj = new ReviewObject();
    //res.status(200).send("Welcome in Reviews data section");
    reviewsObj.create(req.body, (err, result) => {
      if (err instanceof Error) {
        return next(new error_handler(401, err, err));
      } else {
        res.status(200).send(result);
      }
    });

  }

  // public addBussinessImages = async( req:Request,res:Response, next) =>{


  // }


  public addBussiness = async (req: Request, res: Response, next) => {
    console.log("here in post business ..................");  
    //const errors = validationResult(req);
    // console.log(errors) 
    // if (!errors.isEmpty())
    //     return next(new error_handler(422,'something whent wrong!!',errors));
    const errors = validationResult(req);
    console.log(errors) 
    if (!errors.isEmpty())
        return next(new error_handler(422,'something whent wrong!!',errors));
        const businessObj =  new BussinesObject();
        businessObj.create(req.body,(err,result)=>{
            if(err){
              new error_handler(500,'something whent wrong!!',err)
            }
            //console.log('I am here____'+ JSON.stringify(result))
            console.log(err)
            res.status(200).send(result);
        });        
  };


  getBussiness = (req: Request, res: Response, next)=>{
    console.log("here in get business .................."); 
    const businessObj =  new BussinesObject();

    businessObj.find((err,result)=>{
        if(err){
          new error_handler(500,'something whent wrong!!',err)
        } 
        console.log(result)
        res.status(200).send(result);
    },
      { userId: `${req.body.user.user._id}` },
      true
    );
  }

  getBussinessbyId=(req: Request, res: Response, next)=>{
    const businessObj =  new BussinesObject();
    const id = req.params.id;
    if(id){
      businessObj.findOne(id,(error,bussiness)=>{
         if(error){
           next(new error_handler(500,'need Id for call',"need Id for call"))
          }else{
            res.status(200).send(bussiness);
          }
      });
    }else{
      next(new error_handler(500,'need Id for call',"need Id for call"))
    }
        
  }

  getBussinessbySlug = (req: Request, res: Response, next) => {
    const businessObj = new BussinesObject();
    const param = { dirSlug: req.body.dirSlug };

    if (param) {
      businessObj.find((error, bussiness) => {
        if (error) {
          next(new error_handler(500, 'need Id for call', "need Slug for call"))
        } else {

          console.log("business",bussiness)
          res.status(200).send(bussiness);
        }
      },
        param,
        true);
    } else {
      next(new error_handler(500, 'need Id for call', "need Slug for call"))
    }

  }


  static makeid(length) {
     var result           = '';
     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var charactersLength = characters.length;
     for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  } 
  public upload = async (req: Request, res: Response, next) => {
    res.status(200).json(req["file"]);
    const UplaodBussiness = new BussinesObject();
    // UplaodBussiness.upload(req.body);
  };
}

module.exports = Bussiness;
