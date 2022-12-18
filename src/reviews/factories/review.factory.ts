import { ReviewService } from "../services/review.service";
import { ReviewRepository } from "../repositories/review.repository";
import { ReviewModel } from "../models/review.model";
import { ReviewController } from "../controllers/review.controller";
import { bookService } from "../../books/factories/book.factory";

export function reviewFactory() {
  const reviewRepository = new ReviewRepository(ReviewModel);
  const reviewService = new ReviewService(reviewRepository, bookService);
  const reviewController = new ReviewController(reviewService);

  return reviewController;
}

export const review = reviewFactory();