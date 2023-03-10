import express from "express";
import { book } from "../factories/book.factory"

const bookRoutes = express.Router();

bookRoutes.get("/", book.getAll.bind(book));
bookRoutes.get("/:id", book.getById.bind(book));
bookRoutes.post("/", book.create.bind(book));
bookRoutes.put("/:id", book.getUpdate.bind(book));
bookRoutes.patch("/:id", book.updateStatus.bind(book));


export default bookRoutes
