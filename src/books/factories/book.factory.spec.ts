import { bookFactory } from "./book.factory";

describe("userFactory", () => {
  it("should create the user Domain", () => {
    expect(bookFactory()).toBeDefined();
  })
})