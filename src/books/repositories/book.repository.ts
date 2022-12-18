import { Book, BookModel } from "../models/book.model";
import { Model } from "mongoose";
import { ReviewModel } from "../../reviews/models/review.model";


export class BookRepository {
  constructor(private readonly bookModel: Model<Book>) {}

  async getAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async getById(id: string): Promise<Book> {
    const books = await this.bookModel.findById(id).populate("reviewId");
    
    if(books === null) {
      return {} as Book;
    }
    return books;
  }

  async getByAuthor(author:string): Promise<Book[]>{
    const bookAuthor = await this.bookModel.find({author:author});
    if(bookAuthor === null) {
      return [];
    }
    return bookAuthor;
  }

  async getUpdate(id:string, book: Book): Promise<Book> {
    const { language,reviewId } = book
    const updateBook = await this.bookModel.findByIdAndUpdate(id,{$set: {language, reviewId}}, {
      new: true,
    })
    if (updateBook === null) {
      return {} as Book;  
    }
    return updateBook;
  }

  
  async updateStatus(id: string, book: Book): Promise<Book> {
    const { status } = book
    const updateStatusBook = await this.bookModel.findByIdAndUpdate(id, {$set: {status}},{
      new: true,
    })

    if (updateStatusBook === null) {
      return {} as Book;
    }
    return updateStatusBook;
  }

  async updateReview(bookId: string, reviewId: string): Promise<Book> {
    
    const updateBook = await this.bookModel.findByIdAndUpdate(bookId, {$set: {reviewId}},{
      new: true,
    })

    if (updateBook === null) {
      return {} as Book;
    }
    return updateBook;
  }

  

  async create(book: Book): Promise<Book> {
    const newBook =  this.bookModel.create(book);
    return book
  }
}

const bookRepositoy = new BookRepository(BookModel)