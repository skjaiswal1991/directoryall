import { mongooseInstance, mongooseConnection } from "../db/db";
import { IAgreegationInterface } from "../../models/Interfaces/agreegation.interface";
import { Schema } from "mongoose";

const AgreegationSchema = new mongooseInstance.Schema({
  businessId: {
    type:Schema.Types.ObjectId,
    required:true
  },
  yelp:{
    type:Array,
    required:false
  },
  facebook:{
    type:Array,
    required:false
  },
  google: {
    type: Array,
    required: false,
  },
  hotels: {
    type: Array,
    required: false,
  },
  zomato: {
    type: Array,
    required: false,
  },
  googlemap: {
    type: Array,
    required: false,
  },
  amazon: {
    type: Array,
    required: false,
  },
  created_at: {
    type: Date,
    required: false,
  },
  updated_at: {
    type: Date,
    required: false,
  },
}).pre<IAgreegationInterface>("save", function(next) {
  if (this.isNew) {
    this.created_at = new Date();
  } else {
    this.updated_at = new Date();
  }
  next();
});

const schemaModel = mongooseConnection.model<IAgreegationInterface>(
  "agreegation",
  AgreegationSchema
);
export default schemaModel;
