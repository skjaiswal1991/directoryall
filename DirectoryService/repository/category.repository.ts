import { RepositoryBase } from "./base/repository.base";
import CategorySchemaModel from "../dataAccess/Schemas/category.schema";
import { ICategoryInterface } from "../models/Interfaces/category.interface";

export class CategoryRepository extends RepositoryBase<ICategoryInterface> {
    constructor() {
      super(CategorySchemaModel);
    }
  }
Object.seal(CategoryRepository);
  
