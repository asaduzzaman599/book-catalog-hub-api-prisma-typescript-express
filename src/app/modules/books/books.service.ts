import { Book, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import paginationHelpers, {
  IPaginationOption,
} from "../../../helpers/pagination-helpers";
import prismaClient from "../../../shared/prisma-client";
import ApiError from "../../error/api-error";
import { IFilterOption } from "./books.interface";

const insertBook = async (payload: Book): Promise<Book> => {
  const createdBook = await prismaClient.book.create({
    data: payload,
  });

  return createdBook;
};

const updateBook = async (id: string, payload: Book): Promise<Book | null> => {
  const bookExist = await prismaClient.book.findUnique({
    where: {
      id,
    },
  });

  if (!bookExist) throw new ApiError(httpStatus.NOT_FOUND, "Book not exists");

  const book = await prismaClient.book.update({
    where: {
      id,
    },
    data: payload,
  });

  return book;
};

const deleteBook = async (id: string): Promise<Book | null> => {
  const bookExist = await prismaClient.book.findUnique({
    where: {
      id,
    },
  });

  if (!bookExist) throw new ApiError(httpStatus.NOT_FOUND, "Book not exists");

  const book = await prismaClient.book.delete({
    where: {
      id,
    },
  });

  return bookExist;
};

const findOneBook = async (id: string): Promise<Book | null> => {
  const bookExist = await prismaClient.book.findUnique({
    where: {
      id,
    },
  });

  if (!bookExist) throw new ApiError(httpStatus.NOT_FOUND, "Book not exists");

  return bookExist;
};

const findBooks = async (
  filterOptions: IFilterOption,
  paginationOptions: IPaginationOption
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers(paginationOptions);

  const andCondition = [];

  const { search, ...options } = filterOptions;
console.log('options',options)
   if (Object.keys(options).length) {
    andCondition.push({
      AND: Object.entries(options).map(([field, value]) => {
        console.log(field,value)
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


  console.log(search);
  if (search)
    andCondition.push({
      OR: ["title", "author", "genre"].map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });


  const whereCondition: Prisma.BookWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const books = await prismaClient.book.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: "desc",
          },
  });

  const count = await prismaClient.book.count({
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
};

const findBookByCategory = async (id: string): Promise<Book[]> => {
  const books = await prismaClient.book.findMany({
    where: {
      categoryId: id,
    },
  });

  return books;
};

export const BookService = {
  insertBook,
  updateBook,
  deleteBook,
  findOneBook,
  findBooks,
  findBookByCategory,
};
