import { BookModel } from "./book.model";

describe("BookModel",() => {
  it("check if exists. Should be definid", () =>{
    expect(BookModel).toBeDefined();
  });
});