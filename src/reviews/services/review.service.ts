import {Review } from "../models/review.model"
import { ReviewRepository } from "../repositories/review.repository"
import { CustomErrors, invalidIdError, promiseError } from "../../utils/error.handler.ts"
import { Types } from "mongoose";
import { BookService } from "../../books/services/book.service";

export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository,
    private readonly bookService: BookService
    ) {}

  async getAll(): Promise<Review[] | CustomErrors> {
    try{
      const reviews = await this.reviewRepository.getAll();
      return reviews;
    }catch (error) {
      return promiseError(error);
    }
  }

  async getById(id: string): Promise<Review | CustomErrors> {
    if (!Types.ObjectId.isValid(id)){
    return invalidIdError(id);
    }
    try{
      const reviews = await this.reviewRepository.getById(id);
      return reviews;
    }catch (error) {
      return promiseError(error)
    }  
  }

  async update (id: string, review: Review): Promise<Review | CustomErrors> {
    if (!Types.ObjectId.isValid(id)){
      return invalidIdError(id);
      }
      try{
        const updateReview = await this.reviewRepository.update(id, review);
        return updateReview;
      } catch (error) {
        return promiseError(error)
      }      
  }

  async create (review: Review, bookId: string): Promise<Review | CustomErrors | any> {
    try{
      // const dateReview = {...review, updatedAt: [new Date()]};
      // const newReview = await this.reviewRepository.create(dateReview);
      // const book = await this.bookService.associateReview(bookId,(newReview as any).id)
      //return review;
      const NewReview = await this.reviewRepository.create(review)
            await this.bookService.associateReview(bookId, (review as any).id )
            return NewReview
        
    } catch (error) {      
      
         return promiseError(error);
    }
  }

}