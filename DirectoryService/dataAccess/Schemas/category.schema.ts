import { mongooseInstance, mongooseConnection } from "../db/db";
import { ICategoryInterface } from "../../models/Interfaces/category.interface";
import { Schema } from "mongoose";

const CategorySchema = new mongooseInstance.Schema({
  category_title:{
    type:String,
    required:true
  },
  category_slug:{
    type:String,
    required:true
  },
  category_image:{
    type:String,
    required:false
  },
  category_parent:{
    type:String,
    required:false
  },
  category_content:{ 
    type:String,
    required:false
  },
  category_body:{ 
    type:String,
    required:false
  },
  category_metatitle:{ 
    type:String,
    required:false
  },
  category_metadesc:{ 
    type:String,
    required:false
  },
  created_at: {
    type: Date,
    required: false,
  },
  updated_at: {
    type: Date,
    required: false,
  },
}).pre<ICategoryInterface>("save", function(next) {
  if (this.isNew) {
    this.created_at = new Date();
  } else {
    this.updated_at = new Date();
  }
  next();
});

const schemaModel = mongooseConnection.model<ICategoryInterface>(
  "category",
  CategorySchema
);
export default schemaModel;
