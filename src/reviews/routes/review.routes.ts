import  express from "express";
import { review } from "../factories/review.factory";

const reviewRoutes = express.Router();

reviewRoutes.get("/book/:bookId/review/", review.getAll.bind(review));
reviewRoutes.get("/book/:bookId/review/:id", review.getById.bind(review));
reviewRoutes.post("/book/:bookId/review/", review.create.bind(review));
reviewRoutes.patch("/book/:bookId/review/:id", review.getUpdate.bind(review));


export default reviewRoutes;