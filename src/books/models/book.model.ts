import { Schema, model, Model, InferSchemaType } from "mongoose";

 const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 24,
    unique: true,
  },
  date: {
    type: String,
    require: true,
  },
  language: {
    type: [String],
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },  
  reviewId: {
    type: Schema.Types.ObjectId,
    ref: 'Reviews',
  },
  author: {
    type: String,
    required: true,
    unique: true,
    maxlength: 24,
  }

})

export type Book = InferSchemaType<typeof bookSchema>;

export const BookModel: Model<Book> = model("Book",bookSchema)
