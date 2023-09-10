"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const response_1 = __importDefault(require("../../../shared/response"));
const books_service_1 = require("./books.service");
const insertBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = req.body;
    const result = yield books_service_1.BookService.insertBook(book);
    return (0, response_1.default)({ message: "Book inserted  successfully", result }, res);
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield books_service_1.BookService.updateBook(id, data);
    return (0, response_1.default)({ message: "Book updated  successfully", result }, res);
}));
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield books_service_1.BookService.deleteBook(id);
    return (0, response_1.default)({ message: "Book deleted  successfully", result }, res);
}));
const findOneBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield books_service_1.BookService.findOneBook(id);
    return (0, response_1.default)({ message: "Book fetched successfully", result }, res);
}));
const findBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const paginationOptions = (0, pick_1.default)(query, ['page', 'size', 'sortBy', 'sortOrder']);
    const filterOptions = (0, pick_1.default)(query, ['search', 'minPrice', 'maxPrice', 'category']);
    const result = yield books_service_1.BookService.findBooks(filterOptions, paginationOptions);
    return (0, response_1.default)({ message: "Books retrieved successfully", result: { result: result.data, meta: result.meta } }, res);
}));
const findBookByCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.categoryId;
    const result = yield books_service_1.BookService.findBookByCategory(categoryId);
    return (0, response_1.default)({ message: "Books with associated category data fetched successfully", result }, res);
}));
exports.BookController = {
    insertBook,
    updateBook,
    deleteBook,
    findOneBook,
    findBooks,
    findBookByCategory
};
