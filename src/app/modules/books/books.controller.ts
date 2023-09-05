import catchAsync from "../../../shared/catchAsync";
import responseData from "../../../shared/response";
import { BookService } from "./books.service";

const insertBook = catchAsync((req, res) => {
  const book = req.body;

  const result = BookService.insertBook(book);
  
  return responseData({ message: "Book inserted  successfully", result }, res);
});

const updateBook = catchAsync((req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = BookService.updateBook(id, data);

  return responseData({ message: "Book updated  successfully", result }, res);
});

const deleteBook = catchAsync((req, res) => {
  const id = req.params.id;

  const result = BookService.deleteBook(id);

  return responseData({ message: "Book deleted  successfully", result }, res);
});

const findOneBook = catchAsync((req, res) => {
  const id = req.params.id;

  const result = BookService.findOneBook(id);
  return responseData({ message: "Book fetched successfully", result }, res);
});

const findBooks = catchAsync((req, res) => {
  const result = BookService.findBooks();
  return responseData({ message: "Books retrieved successfully", result }, res);
});

const findBookByCategory = catchAsync((req, res) => {
  const categoryId = req.params.categoryId
  const result = BookService.findBookByCategory(categoryId);
  return responseData({ message: "Books with associated category data fetched successfully", result }, res);
});

export const BookController = {
  insertBook,
  updateBook,
  deleteBook,
  findOneBook,
  findBooks,
  findBookByCategory
};
