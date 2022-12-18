import { BookService } from "../services/book.service";
import { StatusCode } from "../../utils/status.code";
import { Request, Response } from "express";

export class BookController {
  constructor(private readonly bookService: BookService) {}

  async getAll(req: Request, res: Response) {   
    const {author} = req.query   
    
    if (author){
      const resultAuthor = await this.bookService.getByAuthor(author as string)
      return res.status(StatusCode.OK).json(resultAuthor)
    } 

  const result = await this.bookService.getAll();

      
    if("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result)
    }

      return res.status(StatusCode.OK).json(result)    
    
  }

  async getById(req: Request, res: Response) {
    //req.params refere-se a um parâmetro de rota
    //exemplo: /pets/:id -> wwww.pets.com/pets/123 -> req.params.id = 123
    const { id } = req.params;
    const result = await this.bookService.getById(id);

    if("invalidIdError" in result) {
      return res.status(StatusCode.BAD_REQUEST).json(result);
    }

    if("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);            
    }

    return res.status(StatusCode.OK).json(result);
     
  }

  async getUpdate(req: Request, res: Response) {
    const { id, } = req.params;
    const { body } = req;
    

    const result = await this.bookService.getUpdate(id,body);

    if("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);            
    }

    if("invalidIdError" in result) {
      return res.status(StatusCode.BAD_REQUEST).json(result);
    }

    return res.status(StatusCode.OK).json(result);

  }

  async updateStatus(req: Request, res: Response) {
    const { id, } = req.params;
    const { body } = req;
  
    const result = await this.bookService.updateStatus(id,body);

    if("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);            
    }

    if("invalidIdError" in result) {
      return res.status(StatusCode.BAD_REQUEST).json(result);
    }

    return res.status(StatusCode.OK).json(result);

  }

  async create(req: Request, res: Response) {
      
    const { body } = req;
    const result = await this.bookService.create(body, req.params.bookId);

    if("promiseError" in result) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(result);            
    }

    return res.status(StatusCode.CREATED).json(result)
  }  
}
