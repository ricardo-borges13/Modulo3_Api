import { Model } from "mongoose";
import { Book, BookModel } from "../models/book.model"
import { fakeId, fakeBookData, updateBook } from "./fake.book.data";

export const fakeBookModel = {
  find: (param) => {
    if(param){   
    return Promise.resolve(fakeBookData[0])
    }
    return Promise.resolve(fakeBookData)
    },
  findById: () => Promise.resolve(fakeBookData[0]), 
  findByIdAndUpdate: () => Promise.resolve(updateBook),
  //findUpdateStatus: () => Promise.resolve(updateBook),
  create: () => Promise.resolve(fakeBookData[0])
} as unknown as Model<Book>
