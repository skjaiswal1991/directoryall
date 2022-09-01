import { Request, Response, Router } from "express";
import Auth from "../../../server/middlewares/authMiddlewares/auth.base.middlware"
import {validationResult} from "express-validator";
import error_handler from "../../../server/middlewares/error.handler.class";
import CategoryApi from "../../../bussinessLogic/category.bussiness";

class Category {
  private _router: Router;
  constructor(router: Router) {
    const multerUpload = new CategoryApi();
    this._router = router;
    this._router.get("/", this.getCategory); 
    this._router.post("/", this.postCategory); 
    this._router.put("/", this.getCategoryBySlug);
    // this._router.patch("/:id", this.editCategory);
    this._router.patch("/",this.updateCategory)
    this._router.post("/image/", multerUpload.uploadMular().single("photo"),this.upload);
  }

  public upload =  async (req:Request,res:Response) =>{
    try{
      res.status(200).send(req['file']);
    }catch(error){
      new error_handler(500,'something whent wrong!!',error)
    }
    //console.log("Image upload section testing",req);
    //console.log("Image upload section testing",res);
  }



  public editCategory =  async (req:Request,res:Response) =>{

    console.log("here in get editCategory .................."); 
    const categoryObj =  new CategoryApi();
    //console.log(req.body);
    categoryObj.findOne(req.params.id,(err,result)=>{
        if(err){
          new error_handler(500,'something whent wrong!!',err)
        } 
        res.status(200).send(result);
    });
  }



  public getCategoryBySlug = async (req: Request, res: Response) => {

    console.log("here in get getCategoryBySlug ..................");
    const categoryObj = new CategoryApi();
    //console.log(req.body);
    categoryObj.find((err, result) => {
      if (err) {
        new error_handler(500, 'something whent wrong!!', err)
      }
      res.status(200).send(result);
    }, { category_slug: req.body.category_slug }, true);
  }

  public getCategory = async (req:Request, res:Response) =>{
    console.log("here in get getCategory .................."); 
    const categoryObj =  new CategoryApi();
    let category  = [];

    categoryObj.find((err,result)=>{
        if(err){
          new error_handler(500,'something whent wrong!!',err)
        }
        let category = result;
        const filterCategory = category.filter((c)=>c.category_title!='Other')
        res.status(200).send(filterCategory);
        // console.log("count",)
        // result.map((cat,i)=>{
          
        //   categoryObj.find((err,resultdata)=>{
        //     if(err){
        //       new error_handler(500,'something whent wrong!!',err)
        //     }
            
        //    category.push(cat)
        //    if(resultdata.length > 0)     
        //    resultdata.map((child,i)=>{
        //     category.push(child)
        //    })
           

        //     if(count == (i + 1)){
        //      // console.log(cat._id);
        //      // console.log(resultdata);
        //       res.status(200).send(category);
        //     }
            
        //   },{"category_parent":cat._id},true)

        // }) 
       // res.status(200).send(result);
    },false);
  }

  // public getCategory = async (req:Request, res:Response) =>{
  //   console.log("here in get getCategory .................."); 
  //   const categoryObj =  new CategoryApi();
  //   let category  = [];

  //   categoryObj.find((err,result)=>{
  //       if(err){
  //         new error_handler(500,'something whent wrong!!',err)
  //       }
  //       let count = result.length;
  //       console.log("count",)
  //       result.map((cat,i)=>{
          
  //         categoryObj.find((err,resultdata)=>{
  //           if(err){
  //             new error_handler(500,'something whent wrong!!',err)
  //           }
            
  //          category.push(cat)
  //          if(resultdata.length > 0)     
  //          resultdata.map((child,i)=>{
  //           category.push(child)
  //          })
           

  //           if(count == (i + 1)){
  //            // console.log(cat._id);
  //            // console.log(resultdata);
  //             res.status(200).send(category);
  //           }
            
  //         },{"category_parent":cat._id},true)

  //       }) 
  //      // res.status(200).send(result);
  //   },{'category_parent':""},true);
  // }

  public postCategory = async (req:Request, res:Response) =>{

      const categoryObj =  new CategoryApi();
      categoryObj.create(req.body,(err,result)=>{
          if(err){
            new error_handler(500,'something whent wrong!!',err)
          }
          console.log('I am here____category'+ JSON.stringify(result))
          console.log(err)
          res.status(200).send(result);
      });

  }
  public updateCategory = async (req:Request, res:Response) =>{

    const categoryObj =  new CategoryApi();

    categoryObj.update(req.body._id,req.body.data,(err,result)=>{
        if(err){
          new error_handler(500,'something whent wrong!!',err)
        }
        console.log('I am upadte category'+ JSON.stringify(result))
        console.log(err)
        res.status(200).send(result);
    });

}

 
}

module.exports = Category;
