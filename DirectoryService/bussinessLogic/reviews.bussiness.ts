import { ReviewsRepository } from "../repository/reviews.repository";
import { IReviews } from "./interfaces/reviews.interface";
import { IReviewsInterface } from "../models/Interfaces/reviews.interface";
import * as path from "path";
import * as multer from "multer";
const uuidv4 = require("uuid-v4");

export default class Reviews implements IReviews {
  private _reviewsRepository: ReviewsRepository;

  constructor() {
    this._reviewsRepository = new ReviewsRepository();
  }

  createOnlyOne(item: IReviewsInterface, callback: (error: any, result: any) => void) {
    this._reviewsRepository.createOnlyOne(item, callback);
  }

  create(item: IReviewsInterface, callback: (error: any, result: any) => void) {
    console.log(item, '....................')
    this._reviewsRepository.create(item, callback);
  }
  updateOne = () => {

  }

  update(
    _id: string,
    item: IReviewsInterface,
    callback: (error: any, result: any) => void
  ) {
    this._reviewsRepository.findOne(_id, (err, res) => {
      if (err) {
        /// console.log(err);
        callback(err, res);
      }
      else {
        // console.log(res);
        this._reviewsRepository.update(res._id, item, callback);
      }
    });
  }

  find(
    callback: (error: any, result: Array<IReviewsInterface>) => void,
    queryObject = {},
    withOption: boolean = false
  ) {
    withOption
      ? this._reviewsRepository.findByOption(callback, queryObject)
      : this._reviewsRepository.find(callback);
  }

  findOne(_id: string, callback: (error: any, result: IReviewsInterface) => void) {
    this._reviewsRepository.findOne(_id, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._reviewsRepository.delete(_id, callback);
  }
  findOneAndUpdate(
    _id: string,
    doc,
    callback: (error: any, result: any) => void
  ) {
    this._reviewsRepository.findOneAndUpdate(_id, doc, callback);
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

  findOneAndUpsert = (Id, doc, callback) => {
    return this._reviewsRepository.findOneAndUpdate(Id, doc, callback)
  }

}
