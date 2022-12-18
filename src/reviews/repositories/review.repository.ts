import {Review , ReviewModel } from "../models/review.model"
import { Model } from "mongoose";


export class ReviewRepository {
  constructor(private readonly ReviewModel: Model<Review>) {}

  async getAll(): Promise<Review[]> {
    const reviews = await this.ReviewModel.find();
    return reviews;
  }

  async getById(id: string): Promise<Review> {
    const reviews = await this.ReviewModel.findById(id);
    
    if(reviews === null) {
      return {} as Review;
    }
    return reviews;
  }


  async update(id:string, review: Review): Promise<Review> {
  
    const updateReview = await this.ReviewModel.findByIdAndUpdate(id,{
      title: review.title,       
      $push: { 
        review: review.review,
        updatedAt: new Date(), 
      },
      score: review.score,      
    },
    {
      new: true,
    });
    if (updateReview === null) {
      return {} as Review;  
    }
    return updateReview;
  }

  async create(review: Review): Promise<Review> {
    const newReview = await  this.ReviewModel.create({
      ...review, updatedAt: [new Date()]
    });   
    return newReview;
  }
}

const reviewRepositoy = new ReviewRepository(ReviewModel)