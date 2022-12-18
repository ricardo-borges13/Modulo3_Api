import { fakeBookData,fakeId, updateBook } from "./fake.book.data";
import { BookService } from '../services/book.service'

export const fakeBookService = {
  getAll: (param) => {
    if(param){   
    return Promise.resolve(fakeBookData[0])
    }
    return Promise.resolve(fakeBookData)
    },
  getById: () => Promise.resolve(fakeBookData[0]), 
  getUpdate: () => Promise.resolve(updateBook),
  getByAuthor: () => Promise.resolve(fakeBookData[0]),
  create: () => Promise.resolve(fakeBookData[0])
} as unknown as BookService;