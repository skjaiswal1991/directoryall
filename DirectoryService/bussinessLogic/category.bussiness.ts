import { CategoryRepository } from "../repository/category.repository";
import { ICategory } from "./interfaces/category.interface";
import { ICategoryInterface } from "../models/Interfaces/category.interface";
import * as path from "path";
import * as multer from "multer";
const uuidv4 = require("uuid-v4");
export default class Bussiness implements ICategory {
  private _categoryRepository: CategoryRepository;

  constructor() {
    this._categoryRepository = new CategoryRepository();
  }

  create(item: ICategoryInterface, callback: (error: any, result: any) => void) {
    console.log(item,'....................')
    this._categoryRepository.create(item, callback);
  }

  update(
    _id: string,
    item: ICategoryInterface,
    callback: (error: any, result: any) => void
  ) {
    this._categoryRepository.findOne(_id, (err, res) => {
      if (err) {
        callback(err, res);
      }
      else {
        console.log("res",res);
        this._categoryRepository.updateOne(res._id, item, callback);
      }
    });
  }

  find(
    callback: (error: any, result: Array<ICategoryInterface>) => void,
    queryObject = {},
    withOption: boolean = false
  ) {
    withOption
      ? this._categoryRepository.findByOption(callback, queryObject)
      : this._categoryRepository.find(callback);
  }

  findOne(_id: string, callback: (error: any, result: ICategoryInterface) => void) {
    this._categoryRepository.findOne(_id, callback);
  }
  // findOneBySlug(category_slug: string, callback: (error: any, result: ICategoryInterface) => void) {
  //   this._categoryRepository.findOne(category_slug, callback);
  // }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._categoryRepository.delete(_id, callback);
  }
  findOneAndUpdate(
    _id: string,
    doc,
    callback: (error: any, result: any) => void
  ) {
    this._categoryRepository.findOneAndUpdate(_id, doc, callback);
  }
  
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
      cb(null, "./public/uploads/category");
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
    return this._categoryRepository.findOneAndUpdate(Id,doc,callback)
  }
  
}
