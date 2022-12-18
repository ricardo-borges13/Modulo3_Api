import { InferSchemaType, model, Model, Schema } from "mongoose";

const reviewSchema = new Schema(
  {
  title:{
    type: String,
    required: true,
    maxLength: 24,
    unique: true,
  },
  review: [
    {
    type: String,
    maxLength: 200,
    required: true,
  },
],
  updatedAt:[
    {
    type: Date,
    default: [Date.now] 
  },
],
  score:{
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  },
 { timestamps: 
    { createdAt: true, 
      updatedAt: false } }
);

export type Review = InferSchemaType<typeof reviewSchema>;

export const ReviewModel: Model<Review> = model("Review", reviewSchema);