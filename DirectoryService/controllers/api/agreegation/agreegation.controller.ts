import { Request, Response, Router } from "express";
import Auth from "../../../server/middlewares/authMiddlewares/auth.base.middlware"
import {validationResult} from "express-validator";
import error_handler from "../../../server/middlewares/error.handler.class";
import AgreegationApi from "../../../bussinessLogic/agreegation.bussiness";

class Agreegation {

  private _router: Router;
  constructor(router: Router) {
        this._router = router;
        this._router.post("/", this.addAgreegationData); 
        this._router.patch("/", this.getAgreegateData);
        // this._router.patch("/review/", this.addAgreegationData); 
    }

    public addAgreegationData = (req:Request,res:Response)=>{

        const agreegate = new AgreegationApi();
        ////console.log(req)        
        // res.status(200).send("shfsjdgfjsgjf");
        //console.log(req.body)
        if (req.body.businessId) {
            const query = { businessId: req.body.businessId }
            agreegate.find((error, result) => {

                //console.log(result);
                if (result.length > 0) {
                    //console.log("If condition");
                    agreegate.update(result[0]._id, req.body, (err, result) => {
                        if (err) {
                            //console.log(err);
                            new error_handler(500, 'something whent wrong!!', err)
                        }
                        res.status(200).send(result);
                    });
                } else {
                    //console.log("Else condition");
                    agreegate.create(req.body,(err,result)=>{
                        if(err){
                            console.log(err);
                          new error_handler(500,'something whent wrong!!',err)
                        } 
                        res.status(200).send(result);
                    });
                }               

            }, query, true)

        }

        // categoryObj.findOne(req.params.id,(err,result)=>{
        //     if(err){
        //       new error_handler(500,'something whent wrong!!',err)
        //     } 
        //     res.status(200).send(result);
        // });
    } 

    getAgreegateData =(req: Request, res: Response) =>
    {
        const params = req.body.businessId
        const agreegate = new AgreegationApi();
        agreegate.find((error,result)=>{
            if(error) new error_handler(500,'something whent wrong!!',error)
             res.status(200).send(result);
        },
        {'businessId': `${params}`}
        ,true)
       
    }
 
}

module.exports = Agreegation;
 