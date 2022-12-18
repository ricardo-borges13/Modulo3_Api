import { Book } from "../models/book.model"
import { BookRepository  } from "../repositories/book.repository"
import { CustomErrors, InvalidIdError, invalidIdError, promiseError } from "../../utils/error.handler.ts"
import { Types } from "mongoose";


export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}
 
async getAll(): Promise<Book[] | CustomErrors>  {
  try{
    const books = await this.bookRepository.getAll();
    return books;
  } catch (error) {
    return promiseError(error);
  }
}

async getById(id: string): Promise<Book | CustomErrors> {
  if (!Types.ObjectId.isValid(id)){
    return invalidIdError(id);
  }
  
  try{
    const books = await this.bookRepository.getById(id);
    return books;
  } catch (error) {
    return promiseError(error)
  }
}

async getByAuthor(author:string): Promise<Book[] | CustomErrors> {
  try{
    const booksAuthor = await this.bookRepository.getByAuthor(author);
    return booksAuthor;
  } catch (error) {
    return promiseError(error);
  }
}

async getUpdate(id:string, book: Book): Promise<Book | CustomErrors> {
  if (!Types.ObjectId.isValid(id)){
    return invalidIdError(id);
  }  
  try{   
    const updateBook = await this.bookRepository.getUpdate(id,book);
    return updateBook;
  } catch(error) {
    return promiseError(error);
  }
}

async updateStatus(id: string, book: Book): Promise<Book | CustomErrors> {
  if (!Types.ObjectId.isValid(id)){
    return invalidIdError(id);
  }  
  try{
    const updateBookStatus = await this.bookRepository.updateStatus(id,book);
    return updateBookStatus;
  } catch(error) {
    return promiseError(error);
  }
}

async associateReview(bookId: string, reviewId: string): Promise<Book | InvalidIdError | CustomErrors> {
  try {
      const updateBook = await this.bookRepository.updateReview(bookId, reviewId)
    
          return invalidIdError(bookId);
      
      return updateBook
  } catch (error) {
      return promiseError(error)
  }
}

async create(book:Book, bookId: string): Promise<Book | CustomErrors> {
  try{
    const newBook = await this.bookRepository.create(book);
    return newBook;
  } catch(error) {
    return promiseError(error);
  }
}
}
