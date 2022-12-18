import { PromiseError, invalidIdError, promiseError } from "./error.handler.ts";

describe("error.handler", () => {
  describe("promiseError", () => {
    it("should return an object with a promiseError property with a message property", () => {
      const error = promiseError("error");
      expect(error).toEqual({
        promiseError: {
          message: "unable to request the Database",
          error: "error",
        },
      })
    })
  });

  describe("invalidIdError", () => {
    it("should return an object with a invalidIdError property with a message property", () => {
      const error = invalidIdError("invalidId");
      expect(error).toEqual({
        invalidIdError: {
          message: "invalid id on request, please submit a Object Id",
          id: "invalidId",
        },
      })
    })
  })
});