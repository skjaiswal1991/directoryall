import { BussinessRepository } from "../repository/bussiness.repository";
import { IBussiness } from "./interfaces/bussiness.bussiness.interface";
import { IBussinessInterface } from "../models/Interfaces/bussiness.interface";

export default class UserBussiness implements IBussiness {
  private _bussinessRepository: BussinessRepository;

  constructor() {
    this._bussinessRepository = new BussinessRepository();
  }

  create(item: IBussinessInterface, callback: (error: any, result: any) => void) {
    this._bussinessRepository.create(item, callback);
  }

  update(
    _id: string,
    item: IBussinessInterface,
    callback: (error: any, result: any) => void
  ) {
    this._bussinessRepository.findOne(_id, (err, res) => {
      if (err) callback(err, res);
      else this._bussinessRepository.update(res._id, item, callback);
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
}
