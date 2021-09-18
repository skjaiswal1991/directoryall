import { AgreegationRepository } from "../repository/agreegation.repository";
import { IAgreegation } from "./interfaces/agreegation.interface";
import { IAgreegationInterface } from "../models/Interfaces/agreegation.interface";
import * as path from "path";
import * as multer from "multer";
const uuidv4 = require("uuid-v4");
export default class Bussiness implements IAgreegation {
  private _agreegationRepository: AgreegationRepository;

  constructor() {
    this._agreegationRepository = new AgreegationRepository();
  }

  create(item: IAgreegationInterface, callback: (error: any, result: any) => void) {
    console.log(item,'....................')
    this._agreegationRepository.create(item, callback);
  }

  update(
    _id: string,
    item: IAgreegationInterface,
    callback: (error: any, result: any) => void
  ) {
    this._agreegationRepository.findOne(_id, (err, res) => {
      if (err) callback(err, res);
      else this._agreegationRepository.updateOne(res._id, item, callback);
    });
  }

  find(
    callback: (error: any, result: Array<IAgreegationInterface>) => void,
    queryObject = {},
    withOption: boolean = false
  ) {
    withOption
      ? this._agreegationRepository.findByOption(callback, queryObject)
      : this._agreegationRepository.find(callback);
  }

  findOne(_id: string, callback: (error: any, result: IAgreegationInterface) => void) {
    this._agreegationRepository.findOne(_id, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._agreegationRepository.delete(_id, callback);
  }
  findOneAndUpdate(
    _id: string,
    doc,
    callback: (error: any, result: any) => void
  ) {
    this._agreegationRepository.findOneAndUpdate(_id, doc, callback);
  }
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
      cb(null, "./public");
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
    return this._agreegationRepository.findOneAndUpdate(Id,doc,callback)
  }
  
}
