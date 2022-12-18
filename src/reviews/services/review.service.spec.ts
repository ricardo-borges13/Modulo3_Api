import { fakeReviewData, updatedReview, fakeId } from "../__mocks__/fake.review.data";
import { fakeReviewRepository, fakeReviewRepositoryReject } from "../__mocks__/fake.review.repository";
import { ReviewService } from "./review.service";
import { jest, describe, it, expect } from "@jest/globals";
import { invalidIdError} from "../../utils/error.handler.ts";
import { fakeBookService } from "../../books/__mocks__/fake.book.service";

const reviewService = new ReviewService(fakeReviewRepository, fakeBookService);

describe("ReviewService", () => {
  describe("getAll", () => {
    it("should call Repository.getAll", async () => {      
      const spy = jest.spyOn(fakeReviewRepository, "getAll");
     
      await reviewService.getAll();

      //verificamos se o método foi chamado
      expect(spy).toHaveBeenCalled();
    });
    it("should return a list of reviews", async () => {
      const review = await reviewService.getAll();
      expect(review).toEqual(fakeReviewData);
    });
    it("should return an promiseError", async () => {
    
      jest.spyOn(fakeReviewRepository, "getAll").mockRejectedValueOnce("Error");

      
      const error = await reviewService.getAll();

     
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
  });

  describe("getById", () => {
    it("should call ReviewRepository.getById", async () => {
      const spy = jest.spyOn(fakeReviewRepository, "getById");
      await reviewService.getById(fakeId);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a review", async () => {
      const book = await reviewService.getById(fakeId);
      expect(book).toEqual(fakeReviewData[0]);
    });
    it("should return an promiseError", async () => {
      jest.spyOn(fakeReviewRepository, "getById").mockRejectedValueOnce("Error");
      const error = await reviewService.getById(fakeId);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });
    it("should return a invalidIdError", async () => {
      const error = await reviewService.getById("invalidId");
      expect(error).toEqual(invalidIdError("invalidId"));
    });
  });


  describe("update", () => {
    it("should call ReviewRepository in update", async () => {
      const spy = jest.spyOn(fakeReviewRepository, "update");
      await reviewService.update(fakeId, updatedReview);
      expect(spy).toHaveBeenCalled();
    });
    it("should return a book", async () => {
      const review = await reviewService.update(fakeId, updatedReview);
      expect(review).toEqual(updatedReview);
    });
    it("should return an promiseError", async () => {
      jest.spyOn(fakeReviewRepository, "update").mockRejectedValueOnce("Error");
      const error = await reviewService.update(fakeId, updatedReview);
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });

    it("should return a invalidIdError", async () => {
      const error = await reviewService.update("invalidId", updatedReview);
      expect(error).toEqual(invalidIdError("invalidId"));
    });
  });

  describe("create", () => {
    it("should call Repository.create", async () => {
      const spy = jest.spyOn(fakeReviewRepository, "create");
      await reviewService.create(fakeReviewData[0],fakeId);
      expect(spy).toHaveBeenCalled();
    });

     it("should return an promiseError", async () => {
       
      jest.spyOn(fakeReviewRepository, "create").mockRejectedValueOnce("Error");
      const result = await reviewService.create(fakeReviewData[0],fakeId);      
       expect(result).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "Error",
        },
      });
    });

  });

});
