import { fakeBookData, fakeId, updateBook } from "../__mocks__/fake.book.data"; 
import { fakeBookRepository } from "../__mocks__/fake.book.repository";
import { BookService } from "./book.service";
import { jest, describe, it, expect } from "@jest/globals";
import { invalidIdError } from "../../utils/error.handler.ts"; 
 

const bookService = new BookService(fakeBookRepository);

describe("BookService" , () => {
  describe("getAll" ,() => {
    it("should call Repository.getall", async () => {
      const spy = jest.spyOn(fakeBookRepository, "getAll");
      await bookService.getAll();
      expect(spy).toHaveBeenCalled();
    });

    it("should return a list of books", async () => {
      const book = await bookService.getAll();      
      expect(book).toEqual(fakeBookData);
    });
    it("should return an promiseError", async () => {
      jest.spyOn(fakeBookRepository, "getAll").mockRejectedValueOnce("Error")
      const error = await bookService.getAll();
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
  });

  describe("getById", () => {
    it("should call Repository.getById", async () => {
      const spy = jest.spyOn(fakeBookRepository, "getById");
      await bookService.getById(fakeId);
      expect(spy).toHaveBeenCalled();
    });

    it("should return a book", async () => {
      const book = await bookService.getById(fakeId);
      expect(book).toEqual(fakeBookData[0]);
    });
    it("should return an promiseError", async () => {
      jest.spyOn(fakeBookRepository, "getById").mockRejectedValueOnce("Error");
      const error = await bookService.getById(fakeId);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
    it("should return a invalidIdError", async () => {
      const error = await bookService.getById("invalidId");
      expect(error).toEqual(invalidIdError("invalidId"));
    });
  });

  describe("getByAuthor", () => {
    it("should call Repository.getByAuthor", async () => {
      const spy = jest.spyOn(fakeBookRepository, "getByAuthor");
      await bookService.getByAuthor("Ricardo Borges");
      expect(spy).toHaveBeenCalled();
    });

    it("should return an Author", async () => {
      const book = await bookService.getByAuthor("Ricardo Borges");
      expect(book).toEqual(fakeBookData[0]);
    });
    it("should return an promiseError", async () => {
      jest.spyOn(fakeBookRepository, "getByAuthor").mockRejectedValueOnce("Error");
      const error = await bookService.getByAuthor(fakeId);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
  });

  describe("getUpdate", () => {
    it("should call Repository.getUpdate", async () => {
      const spy = jest.spyOn(fakeBookRepository, "getUpdate");
      await bookService.getUpdate(fakeId,updateBook);
      expect(spy).toHaveBeenCalled();
    });

    it("should return a Book", async () => {
      const book = await bookService.getUpdate(fakeId,updateBook);
      expect(book).toEqual(updateBook);
    });
    it("should return an promiseError", async () => {
      jest.spyOn(fakeBookRepository, "getUpdate").mockRejectedValueOnce("Error");
      const error = await bookService.getUpdate(fakeId,updateBook);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
    it("should return a invalidIdError", async () => {
      const error = await bookService.getUpdate("invalidId",updateBook);
      expect(error).toEqual(invalidIdError("invalidId"));
    });
  });

  describe("create", () => {
    it("should call Repository.create", async () => {
      const spy = jest.spyOn(fakeBookRepository, "create");
      await bookService.create(fakeBookData[0]);
      expect(spy).toHaveBeenCalled();
    });

    it("should return a book", async () => {
      const book = await bookService.create(fakeBookData[0]);
      expect(book).toEqual(fakeBookData[0]);
    });
    it("should return an promiseError", async () => {
      jest.spyOn(fakeBookRepository, "create").mockRejectedValueOnce("Error");
      const error = await bookService.create(fakeBookData[0]);
   
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
  });

});