import dotenv from 'dotenv';
import  express  from 'express';
import { mongoConnect } from './db/mongo.connection';
import bookRoutes from './books/routes/book.routes';
import reviewRoutes from './reviews/routes/review.routes';

mongoConnect()

const app = express();
app.use(express.json());
app.use(reviewRoutes);
app.use("/book",bookRoutes);
app.listen(3000, () => console.log("Server is running on port 3000"));
