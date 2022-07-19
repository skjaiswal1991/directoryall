import { Request, Response, Router } from "express";
import Auth from "../../../server/middlewares/authMiddlewares/auth.base.middlware"
import {validationResult} from "express-validator";
import error_handler from "../../../server/middlewares/error.handler.class";
import CategoryApi from "../../../bussinessLogic/category.bussiness";
import BussinesObject from '../../../bussinessLogic/bussiness.bussiness'
import AgreegationObject from '../../../bussinessLogic/agreegation.bussiness'
import ReviewObject from '../../../bussinessLogic/reviews.bussiness'

const probe = require('probe-image-size');
class Frontendapi {
  private _router: Router;
  constructor(router: Router) {
    this._router = router;
    this._router.get('/category',this.getCategoryData)
    this._router.get('/totalcategory',this.getTotalCategoryData)
    this._router.post('/directorylisting',this.getDirectoryListingByCatSlug)
    this._router.post('/directory',this.getDirectoryDataBySlug)
    this._router.get('/directory',this.getDirectoryData)
    // this api use to get chield category by parent category slug
    this._router.post('/directorychieldcategory',this.directorychieldcategory)
    this._router.post('/directorycategorypage',this.getCategorypage)
  }


  getCategorypage = (req: Request, res: Response ) =>{
    const bussinesObject = new BussinesObject();
    const category = new CategoryApi()
    const reviewObject = new ReviewObject()
    const body = req.body;
    
    category.find((err,catdata)=>{
      if(err){
        new error_handler(500,'something whent wrong!!',err)
      }
            // console.log("Category",catdata);
            var categoryDetails = catdata[0];
            bussinesObject.find((err,data)=>{
              if(err)
                new error_handler(500,'something whent wrong!!',err)
                category.find((error,chieldCat)=>{
                  if(error) new error_handler(500,'something whent wrong!!',error)
                    
                    //console.log("catdata[0]._id",catdata[0]._id)
                    reviewObject.find((error,review)=>{
                      if(error) new error_handler(500,'something whent wrong!!',error)
                        //  console.log("review API",review);
                        // let data = {...dir,agreegate,review,imgDetails}
                        // res.status(200).send(data)
                        let newData = {data,chieldCat,categoryDetails,review}
                        res.status(200).send(newData)
                  },
                  {},
                  false)
                    

                  },{category_parent:catdata[0]._id},true)

                
            },
            {
              'category': {
                '$elemMatch': {
                  '_id': `${catdata[0]._id}`
                }
              }
            },true)
      
      
    },{category_slug:body.slug},true)

  }

getDirectoryData = (req:Request,res:Response)=>{

  const bussinesObject = new BussinesObject();  
  bussinesObject.find((error,data)=>{
      if(error) new error_handler(500,'something whent wrong!!',error)
        res.status(200).send(data)
  })
}

get_file_validation = (filepath) => {
  var request = require('request'); // include request module
  return new Promise((resolve,rejects)=>{
    request(filepath, function (err, resp) {
      console.log(resp.statusCode,err)
      if (resp.statusCode === 200) {
        resolve(true);  // file exist
      }
      if (resp.statusCode === 404) {
        resolve(false);  // file exist
      }
        rejects(false);
        // file does not exist
    });
  })

}

getDirectoryDataBySlug = (req:Request,res:Response)=>{

  const bussinesObject = new BussinesObject();
  const agreegationObject = new AgreegationObject();
  const reviewObject = new ReviewObject()
  const body = req.body;
  console.log("requeest at",body);
  bussinesObject.find(async(error,dir)=>{ 
      if(error) new error_handler(500,'something whent wrong!!',error)
           console.log("Data Response",dir);
            let dataDir = JSON.parse(JSON.stringify(dir));
            let ImageD = dataDir[0].images;
            let imgDetails = {}
            //console.log("image",ImageD[0].file_name);
            // if(ImageD && ImageD.length > 0 && ImageD[0].file_name){
            //   let response = await this.get_file_validation(`https://www.rateusonline.com/wp-content/sabai/File/files/${ImageD[0].file_name}`)
            //   if(response)
            //     imgDetails  = await probe(`https://www.rateusonline.com/wp-content/sabai/File/files/${ImageD[0].file_name}`);
            // }
            agreegationObject.find((error,agreegate)=>{
              if(error) new error_handler(500,'something whent wrong!!',error)
             
                reviewObject.find((error,review)=>{
                    if(error) new error_handler(500,'something whent wrong!!',error)
                      
                      let data = {...dir,agreegate,review,imgDetails}
                      res.status(200).send(data)
                },
                {businessId:dir[0]._id},
                true)

            },
            {businessId:dir[0]._id},
            true)
          
      },

      {dirSlug:body.slug},
      true
    )
}


directorychieldcategory = (req:Request,res:Response)=>{

  const category = new CategoryApi()
  const body = req.body;
  console.log("rdirectorychieldcategory",body);
  if(body.slug){

  
  category.find((error,data)=>{
      if(error) new error_handler(500,'something whent wrong!!',error)
      if(data){
        category.find((error,data)=>{
          if(error) new error_handler(500,'something whent wrong!!',error)
            res.status(200).send(data)
          },{category_parent:data[0]._id},true)
      }else{
        new error_handler(500,'something whent wrong!!',error)
      }
      
      
    //console.log(data);

  },{category_slug:body.slug},true)
}


}


  getCategoryData = (req: Request, res: Response ) =>{
    const category = new CategoryApi()
    category.find((err,data)=>{
      if(err){
        new error_handler(500,'something whent wrong!!',err)
      }
      res.status(200).send(data)
    },{category_parent:""},false)

  }

  getCategoryBySlug = async (req: Request, res: Response) => {

    console.log("here in get FrontAPI getCategoryBySlug ..................");
    const categoryObj = new CategoryApi();
    //console.log(req.body);
    categoryObj.find((err, result) => {
      if (err) {
        new error_handler(500, 'something whent wrong!!', err)
      }
      res.status(200).send(result);
    }, { category_slug: req.body.category_slug }, true);
  }



  getTotalCategoryData = (req: Request, res: Response ) =>{
    //console.log("getTotalCategoryData ++++")
    const category = new CategoryApi()
    category.find((err,data)=>{
      if(err){
        new error_handler(500,'something whent wrong!!',err)
      }
      //console.log("Category List",data.length)
      res.status(200).send(data)
    })

  }
 
  getDirectoryListingByCatSlug = (req: Request, res: Response ) =>{
    const bussinesObject = new BussinesObject();
    const category = new CategoryApi()
    const review = new ReviewObject()
    const body = req.body;
    
    category.find((err,catdata)=>{
      if(err){
        new error_handler(500,'something whent wrong!!',err)
      }
            //console.log("Category",catdata);
           if(!catdata && !catdata[0]._id){
               res.status(200).send({data:[],categoryDetails:[],reviewdata:[]})
            }else{    
              var categoryDetails = catdata[0];
           
            bussinesObject.find((err,data)=>{
              if(err)
                new error_handler(500,'something whent wrong!!',err)
                // let newData = {data,categoryDetails}
                review.find((error,reviewdata)=>{
                  if(err)
                    new error_handler(500,'something whent wrong!!',error) 
                    let newData = {data,categoryDetails,reviewdata}
                    res.status(200).send(newData)
                },{},false)
               
            },
            {
              'category': {
                '$elemMatch': {
                  '_id': `${catdata[0]._id}`
                }
              }
            },true)
          }
      
      
    },{category_slug:body.slug},true)

  }

}

module.exports = Frontendapi;