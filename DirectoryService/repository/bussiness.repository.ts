import { RepositoryBase } from "./base/repository.base";
import BussinessSchemaModel from "../dataAccess/Schemas/bussiness.schema";
import { IBussinessInterface } from "../models/Interfaces/bussiness.interface";

export class BussinessRepository extends RepositoryBase<IBussinessInterface> {
    constructor() {
      super(BussinessSchemaModel);
    }

    
  }
Object.seal(BussinessRepository);
  
