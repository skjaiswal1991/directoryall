import {IBussinesssInterface} from './Interfaces/bussiness.interface';

export class BussinesssModel {
  private _bussinessModel:IBussinesssInterface;
  constructor(bussinessModel:IBussinesssInterface){
    this._bussinessModel = bussinessModel
  }
}
Object.seal(BussinesssModel);