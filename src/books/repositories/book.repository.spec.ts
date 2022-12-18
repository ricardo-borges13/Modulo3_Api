import { fakeBookData, updateBook, fakeId } from "../__mocks__/fake.book.data";
import { fakeBookModel } from "../__mocks__/fake.book.model";
import { BookRepository } from "./book.repository";
import { jest } from "@jest/globals"

const bookRepository = new BookRepository(fakeBookModel);

describe("BookRepository", () =>{
  describe("getAll",() => {
    it("should return a list of book", async () => {
      const book = await bookRepository.getAll();
      expect(book).toEqual(fakeBookData);
    });
    
  });

  describe("getById", () => {
    it("should return a single book", async () => {
      jest.spyOn(fakeBookModel, "findById").mockImplementationOnce(
          () => ({
              populate: jest.fn().mockImplementationOnce(() => fakeBookData[0])
          }) as any
      )      
      
      const book = await bookRepository.getById(fakeId);
      expect(book).toEqual(fakeBookData[0]);
    });
    it("should return an empty object", async () => {
      jest.spyOn(fakeBookModel,"findById").mockImplementationOnce(
        () => ({
          populate: jest.fn().mockImplementationOnce(() => null)
      }) as any
      );
      const book = await bookRepository.getById(fakeId);
      expect(book).toEqual({});

    });  
  });


  describe("getByAuthor", () => {
    it("Retonar o autor", async () => {
      const author = await bookRepository.getByAuthor("Ricardo Borges")
      expect(author).toEqual(fakeBookData[0])
    });
    it("should return an empty object", async () => {
      jest.spyOn(fakeBookModel,'find').mockResolvedValueOnce([]);
      const author = await bookRepository.getByAuthor('');
      expect(author).toEqual([]) 
  })
})

  describe("getUpdate", () => {
    it("should return a book", async () => {
      const book = await bookRepository.getUpdate(fakeId, fakeBookData[0]);
      expect(book).toEqual(updateBook)
    });
    it("should return an empty object", async() => {
      jest.spyOn(fakeBookModel,'findByIdAndUpdate').mockResolvedValueOnce(null);
      const book = await bookRepository.getUpdate(fakeId,fakeBookData[0]);
      expect(book).toEqual({});     
    })
  });


describe("updateStatus", () => {
  it("should return a update book", async () => {
    const book = await bookRepository.updateStatus(fakeId, fakeBookData[0]);
    expect(book).toEqual(updateBook)
  });
  it("should return an empty object", async() => {
    jest.spyOn(fakeBookModel,'findByIdAndUpdate').mockResolvedValueOnce(null);
    const book = await bookRepository.updateStatus(fakeId,fakeBookData[0]);
    expect(book).toEqual({});     
  })
});

  
  describe("create", () => {
    it("Criar um book", async () => {
      const book = await bookRepository.create(fakeBookData[0]);
      expect(book).toEqual(fakeBookData[0])
    })
  });
})

