import { jest} from "@jest/globals";
import { mongoConnect, mongoDisconnect } from "../db/mongo.connection";
import express  from "express";
import supertest from "supertest"; //É usado para testar HTTP, ele irá simular um REQUEST HTTP que o Postman faz.
import bookRoutes from "../books/routes/book.routes";

const app = express();
app.use(express.json());
app.use("/test2", bookRoutes)

const testBook = {
  title: "HTML12",
  date: "07/11/1950",
  language: ["Português","Inglês"],
  status: true,
  author: "Gustavo Cardoso2",
};

const testBook2 = {
  title: "CSS",
  date: "07/11/2000",
  language: ["Português","Inglês"],
  status: true,
  author: "Harriet Borges",
};


 beforeAll( async () => {
  await mongoConnect();
});

afterAll( async () => {
  await mongoDisconnect();
});

describe("book", () => {
  it("should create book", async () => {
    const response = await supertest(app).post("/test2").send(testBook);
    expect(response.status).toBe(201);
  });

  it("should get all book" , async () => {
    const response = await supertest(app).get("/test2");
    expect(response.status).toBe(200);
  });

  it("should get book by id", async () => {
    const getAll = await supertest(app).get("/test2");
    const id = getAll.body[0]._id;
    const response = await supertest(app).get(`/test2/${id}`);
    expect(response.status).toBe(200);
  });

  it("should update a book", async () => {
    const getAll = await supertest(app).get("/test2");
    const lastBook = getAll.body[getAll.body.length - 1];
    const id = lastBook._id;
    const response = await supertest(app).put(`/test2/${id}`).send(testBook2);
    expect(response.status).toBe(200);
  });

  it("should update a book status", async () => {
    const getAll = await supertest(app).get("/test2");
    const lastBookStatus = getAll.body[getAll.body.length - 1];
    const id = lastBookStatus._id;
    const response = await supertest(app).patch(`/test2/${id}`).send(testBook2);
    expect(response.status).toBe(200);
  });
})

