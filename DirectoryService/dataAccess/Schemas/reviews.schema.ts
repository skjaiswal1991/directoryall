import { mongooseInstance, mongooseConnection } from "../db/db";
import { IReviewsInterface } from "../../models/Interfaces/reviews.interface";
import { Schema } from "mongoose";

const ReviewsSchema = new mongooseInstance.Schema({
  businessId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  reviewtitle: {
    type: String,
    required: false
  },
  reviewdesc: {
    type: String,
    required: false
  },
  rating: {
    type: Array,
    required: false,
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
  },
  publish_date: {
    type: Date,
    required: false,
  },
  updated_at: {
    type: Date,
    required: false,
  },
}).pre<IReviewsInterface>("save", function (next) {
  if (this.isNew) {
    this.created_at = new Date();
  } else {
    this.updated_at = new Date();
  }
  next();
});

const schemaModel = mongooseConnection.model<IReviewsInterface>(
  "reviews",
  ReviewsSchema
);
export default schemaModel;
