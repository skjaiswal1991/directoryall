import { Document,Schema } from "mongoose";

export interface ICategoryInterface extends Document {
  category_title:String,
  category_slug:String,
  category_parent:String,
  category_image:String,
  category_content:String,
  created_at: Date;
  updated_at: Date;
}
