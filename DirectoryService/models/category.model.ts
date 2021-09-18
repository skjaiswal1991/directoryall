import {ICategoryInterface} from './Interfaces/category.interface';

export class CategoryModel {
  private _categoryModel:ICategoryInterface;
  constructor(categoryModel:ICategoryInterface){
    this._categoryModel=categoryModel
  }

  
}
Object.seal(CategoryModel);