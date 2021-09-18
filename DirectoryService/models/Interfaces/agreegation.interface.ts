import { Document,Schema } from "mongoose";

export interface IAgreegationInterface extends Document {
  businessId:Schema.Types.ObjectId,
  yelp:Array<Object>,
  facebook:Array<Object>,
  zomato: Array<Object>,
  googlemap: Array<Object>,
  amazon: Array<Object>,
  hotels: Array<Object>,
  google:Array<Object>,
  created_at: Date;
  updated_at: Date;
}
