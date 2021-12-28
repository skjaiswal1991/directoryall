import { BussinessRepository } from "../repository/bussiness.repository";
import { IBussiness } from "./interfaces/bussiness.bussiness.interface";
import { IBussinessInterface } from "../models/Interfaces/bussiness.interface";
import * as path from "path";
import * as multer from "multer";
const uuidv4 = require("uuid-v4");
export default class Bussiness implements IBussiness {
  private _bussinessRepository: BussinessRepository;

  constructor() {
    this._bussinessRepository = new BussinessRepository();
  }
 
  createOnlyOne(item: IBussinessInterface, callback: (error: any, result: any) => void){
     this._bussinessRepository.createOnlyOne(item,callback);
  } 

  create(item: IBussinessInterface, callback: (error: any, result: any) => void) {
    console.log(item,'....................')
    this._bussinessRepository.create(item, callback);
  }
  updateOne = () =>{

  }
  
  update(
    _id: string,
    item: IBussinessInterface,
    callback: (error: any, result: any) => void
  ) {
    this._bussinessRepository.findOne(_id, (err, res) => {
      if (err){
       /// console.log(err);
          callback(err, res);
      } 
      else {
       // console.log(res);
        this._bussinessRepository.update(res._id, item, callback);
      }
    });
  }

  find(
    callback: (error: any, result: Array<IBussinessInterface>) => void,
    queryObject = {},
    withOption: boolean = false
  ) {
    withOption
      ? this._bussinessRepository.findByOption(callback, queryObject)
      : this._bussinessRepository.find(callback);
  }

  findOne(_id: string, callback: (error: any, result: IBussinessInterface) => void) {
    this._bussinessRepository.findOne(_id, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._bussinessRepository.delete(_id, callback);
  }
  findOneAndUpdate(
    _id: string,
    doc,
    callback: (error: any, result: any) => void
  ) {
    this._bussinessRepository.findOneAndUpdate(_id, doc, callback);
  }
  storage = multer.diskStorage({
    
    destination: (req, file, cb) => {

      var fs = require('fs');

     const currentYear = new Date().getFullYear();
     console.log(currentYear);
     let month = new Date().getMonth();
     month = month + 1;
     var dir = './public/uploads/directory/'+currentYear;
     
    if (!fs.existsSync(dir)){
         fs.mkdirSync(dir,true) ;
     }
     dir = './public/uploads/directory/'+currentYear+'/'+month
     
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir,true) ;
    }

      /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      /*
        uuidv4() will generate a random ID that we'll use for the
        new filename. We use path.extname() to get
        the extension from the original file name and add that to the new
        generated ID. These combined will create the file name used
        to save the file on the server and will be available as
        req.file.pathname in the router handler.
      */
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
  });

  uploadMular = () => {
    const storage = this.storage;
    return multer({ storage });
  };

  findOneAndUpsert = (Id,doc,callback) =>{
    return this._bussinessRepository.findOneAndUpdate(Id,doc,callback)
  }
  
}
