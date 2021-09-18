import { RepositoryBase } from "./base/repository.base";
import AgreegationSchemaModel from "../dataAccess/Schemas/agreegation.schema";
import { IAgreegationInterface } from "../models/Interfaces/agreegation.interface";

export class AgreegationRepository extends RepositoryBase<IAgreegationInterface> {
    constructor() {
      super(AgreegationSchemaModel);
    }
  }
Object.seal(AgreegationRepository);
  
