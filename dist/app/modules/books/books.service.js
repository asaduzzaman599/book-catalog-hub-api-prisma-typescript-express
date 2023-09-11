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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_helpers_1 = __importDefault(require("../../../helpers/pagination-helpers"));
const prisma_client_1 = __importDefault(require("../../../shared/prisma-client"));
const api_error_1 = __importDefault(require("../../error/api-error"));
const insertBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBook = yield prisma_client_1.default.book.create({
        data: payload,
    });
    return createdBook;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bookExist = yield prisma_client_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!bookExist)
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "Book not exists");
    const book = yield prisma_client_1.default.book.update({
        where: {
            id,
        },
        data: payload,
    });
    return book;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bookExist = yield prisma_client_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!bookExist)
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "Book not exists");
    const book = yield prisma_client_1.default.book.delete({
        where: {
            id,
        },
    });
    return bookExist;
});
const findOneBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bookExist = yield prisma_client_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!bookExist)
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "Book not exists");
    return bookExist;
});
const findBooks = (filterOptions, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = (0, pagination_helpers_1.default)(paginationOptions);
    const andCondition = [];
    const { search } = filterOptions, options = __rest(filterOptions, ["search"]);
    if (Object.keys(options).length) {
        andCondition.push({
            AND: Object.entries(options).map(([field, value]) => {
                if (field === "minPrice") {
                    return {
                        price: {
                            gte: Number(value),
                        },
                    };
                }
                if (field === "maxPrice") {
                    return {
                        price: {
                            lte: Number(value),
                        },
                    };
                }
                return {
                    [field]: value,
                };
            }),
        });
    }
    if (search)
        andCondition.push({
            OR: ["title", "author", "genre"].map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        });
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    const books = yield prisma_client_1.default.book.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? { [sortBy]: sortOrder }
            : {
                createdAt: "desc",
            },
    });
    const count = yield prisma_client_1.default.book.count({
        where: whereCondition,
    });
    return {
        meta: {
            page,
            size: limit,
            total: count,
            totalPage: !isNaN(count / limit) ? Math.ceil(count / limit) : 0,
        },
        data: books,
    };
});
const findBookByCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma_client_1.default.book.findMany({
        where: {
            categoryId: id,
        },
    });
    return books;
});
exports.BookService = {
    insertBook,
    updateBook,
    deleteBook,
    findOneBook,
    findBooks,
    findBookByCategory,
};
