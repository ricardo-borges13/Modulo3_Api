import { mockResponse, mockRequest } from "../__mocks__/fake.book.routes";
import { fakeBookService } from "../__mocks__/fake.book.service";
import { BookController } from "./book.controller";
import { fakeId, fakeBookData, updateBook} from "../__mocks__/fake.book.data";
import { StatusCode } from "../../utils/status.code";

import { invalidIdError, promiseError } from "../../utils/error.handler.ts";


const bookController = new BookController(fakeBookService);
const req = mockRequest();
const res = mockResponse();

describe("BookController", () => {
  describe("getAll", () => {
   
    it("should return all books", async () => {
      await bookController.getAll(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeBookData);
    });
    //Aqui verificamos se o Statuscode foi OK. 
    it("should return status code 200", async () => {
      await bookController.getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    });
    it("should return a promiseError", async () => {
      jest.spyOn(fakeBookService, "getAll")
      .mockImplementation(() => Promise.resolve(promiseError("error")));
      await bookController.getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    })
  });

  describe("getById", () => {
    it("should return a book", async () => {
      await bookController.getById(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeBookData[0])
    });
    it("should return status code 200", async () => {
      req.params.id = fakeId;
      await bookController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    });

    it("should return a promiseError", async () => {
      req.params.id = fakeId;
      jest
        .spyOn(fakeBookService, "getById")
        .mockImplementation(() => Promise.resolve(promiseError("error")));
        await bookController.getById(req, res);
        expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
      });

      it("should return a invalidIdError", async () => {
        jest
          .spyOn(fakeBookService, "getById")
          .mockImplementation(() => Promise.resolve(invalidIdError("id")));
        await bookController.getById(req, res);
        expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
      });
  });

  describe("getUpdate", () => {
    it("should update a book", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      await bookController.getUpdate(req, res);
      expect(res.json).toHaveBeenCalledWith(updateBook);
    });
    it("should return status code 200", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      await bookController.getUpdate(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.OK)
    });
    it("should return a promiseError", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      jest
        .spyOn(fakeBookService, "getUpdate")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await bookController.getUpdate(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    });
    it("should return a invalidIdError", async () => {
      req.params.id = fakeId;
      req.body = fakeBookData[0];
      jest
        .spyOn(fakeBookService, "getUpdate")
        .mockImplementation(() => Promise.resolve(invalidIdError("id")));

      await bookController.getUpdate(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST);
    });

  });

  describe("create", () => {
    it("should create a book", async () =>{
      req.body = fakeBookData[0];
      await bookController.create(req, res);
      expect(res.json).toHaveBeenCalledWith(fakeBookData[0]);
    });
    it("should return status code 201", async () => {
      req.body = fakeBookData[0];
      await bookController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.CREATED)
    });
    it("should return a promiseError", async () => {
      req.body = fakeBookData[0];
      jest
        .spyOn(fakeBookService, "create")
        .mockImplementation(() => Promise.resolve(promiseError("error")));

      await bookController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
    }); 
  });
})


