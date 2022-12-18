import mongoose from "mongoose";
import { Book } from "../models/book.model";

export const fakeId = "6398e4d2523b0a24d997da8c";

export const fakeBookData: Book[] = [
  {   
    title: "Delphi",
    date: "17/01/1978",
    language: ["Português"],
    status: true,
    reviewId: new mongoose.Types.ObjectId(),
    author:"Ricardo Borges",
  },
  {   
    title: "Java",
    date: "01/01/2020",
    language: ["Inglês"],
    status: true,
    reviewId: new mongoose.Types.ObjectId(),
    author:"Gustavo Cardoso",
  },
]

export const updateBook: Book = {
  title: "CSS",
  date: "15/05/1998",
  language: ["Português"],
  status: true,
  reviewId: new mongoose.Types.ObjectId(),
  author:"Adriana Emilene",
}

