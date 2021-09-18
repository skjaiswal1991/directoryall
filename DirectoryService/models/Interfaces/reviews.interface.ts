import { Document, Schema } from "mongoose";

export interface IReviewsInterface extends Document {
  businessId: Schema.Types.ObjectId,
  reviewtitle: String,
  reviewdesc: String,
  rating: Array<Object>,
  userID: Schema.Types.ObjectId,
  publish_date: Date;
  created_at: Date;
  updated_at: Date;
}
