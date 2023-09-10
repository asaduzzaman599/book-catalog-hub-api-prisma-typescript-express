"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const books_controller_1 = require("./books.controller");
const router = express_1.default.Router();
router.route('/create-book').post((0, auth_1.default)(client_1.Role.admin), books_controller_1.BookController.insertBook);
router.route('/').get(books_controller_1.BookController.findBooks);
router.route('/:categoryId/category').get(books_controller_1.BookController.findBookByCategory);
router.route('/:id')
    .get(books_controller_1.BookController.findOneBook)
    .patch((0, auth_1.default)(client_1.Role.admin), books_controller_1.BookController.updateBook)
    .delete((0, auth_1.default)(client_1.Role.admin), books_controller_1.BookController.deleteBook);
exports.BookRouter = router;
