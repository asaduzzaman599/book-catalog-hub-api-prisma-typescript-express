import catchAsync from "../../../shared/catchAsync"
import pick from "../../../shared/pick"
import responseData from "../../../shared/response"
import { BookService } from "./books.service"

const insertBook = catchAsync(async (req, res) => {
  
  const book = req.body;

  const result = await BookService.insertBook(book);
  
  return responseData({ message: "Book inserted  successfully", result }, res);
});

const updateBook = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = await BookService.updateBook(id, data);

  return responseData({ message: "Book updated  successfully", result }, res);
});

const deleteBook = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await BookService.deleteBook(id);

  return responseData({ message: "Book deleted  successfully", result }, res);
});

const findOneBook = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await BookService.findOneBook(id);
  return responseData({ message: "Book fetched successfully", result }, res);
});

const findBooks = catchAsync(async (req, res) => {
  const query = req.query
  const paginationOptions = pick(query,['page', 'size','sortBy','sortOrder'])
  const filterOptions = pick(query,['search', 'minPrice','maxPrice','category'])
  const result = await BookService.findBooks(filterOptions,paginationOptions);
  return responseData({ message: "Books retrieved successfully",result:  { result: result.data, meta: result.meta}}, res);
});

const findBookByCategory = catchAsync(async (req, res) => {
  const categoryId = req.params.categoryId
  const query = req.query
  const paginationOptions = pick(query,['page', 'size','sortBy','sortOrder'])
  const filterOptions = pick(query,['search', 'minPrice','maxPrice','category'])
  filterOptions.categoryId = categoryId
  const result = await BookService.findBooks(filterOptions,paginationOptions);
  return responseData({ message: "Books with associated category data fetched successfully", result:  { result: result.data, meta: result.meta}}, res);
});
export const BookController = {
  insertBook,
  updateBook,
  deleteBook,
  findOneBook,
  findBooks,
  findBookByCategory
};
