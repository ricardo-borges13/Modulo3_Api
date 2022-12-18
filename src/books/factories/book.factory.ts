import { BookService } from "../services/book.service";
import { BookRepository } from "../repositories/book.repository";
import { BookModel } from "../models/book.model";
import { BookController } from "../controllers/book.controller";

export function bookFactory() {
  const bookRepository = new BookRepository(BookModel);
  const bookService = new BookService(bookRepository);
  const bookController = new BookController(bookService);

  return {bookController, bookService}
}

const bookCreated = bookFactory();
export const book = bookCreated.bookController;
export const bookService = bookCreated.bookService;