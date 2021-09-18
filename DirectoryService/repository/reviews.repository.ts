import { RepositoryBase } from "./base/repository.base";
import ReviewsSchemaModel from "../dataAccess/Schemas/reviews.schema";
import { IReviewsInterface } from "../models/Interfaces/reviews.interface";

export class ReviewsRepository extends RepositoryBase<IReviewsInterface> {
  constructor() {
    super(ReviewsSchemaModel);
  }
}
Object.seal(ReviewsRepository);

