import { reviewFactory } from "./review.factory";

describe("UserFactory", () => {
  it("should create the user Domain", () => {
    expect(reviewFactory()).toBeDefined();
  });
});
