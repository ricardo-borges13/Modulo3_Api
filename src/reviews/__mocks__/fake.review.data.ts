import mongoose from "mongoose";
import { Review } from "../models/review.model";

export const fakeId = '6398e4d2523b0a24d997da8c';

export const fakeReviewData: Review[] = [
  {
      title: "Resenha Livro 1",
      score: 5,
      review: ["bla bla bla", "helo helo helo"],
      updatedAt: [new Date()]

  },
  {
      title: "Resenha Livro 2",
      score: 3,
      review: ["bla bla bla", "helo helo helo"],
      updatedAt: [new Date()]
  },
  {
      title: "Resenha Livro 3",
      score: 1,
      review: ["bla bla bla", "helo helo helo"],
      updatedAt: [new Date()]
  },
]

export const updatedReview: Review = {
  title: "Resenha Livro 4",
  score: 1,
  review: ["bla bla bla", "helo helo helo"],
  updatedAt: [new Date()]


}