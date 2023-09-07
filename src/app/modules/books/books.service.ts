import { Book, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import prismaClient from "../../../shared/prisma-client";
import { IFilterOption, IPaginationOption } from "./books.interface";

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

  if (!bookExist) console.log(httpStatus.NOT_FOUND, "Book not exists");

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

  if (!bookExist) console.log(httpStatus.NOT_FOUND, "Book not exists");

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

  if (!bookExist) console.log(httpStatus.NOT_FOUND, "Book not exists");

  return bookExist;
};

const findBooks = async (
  filterOptions: IFilterOption,
  paginationOptions: IPaginationOption
): Promise<Book[]> => {
  const andCondition = [];

  if (Object.keys(filterOptions).length) {
    andCondition.push({
      AND: Object.entries(filterOptions).map(([field, value]) => {
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

  const { search, ...options } = filterOptions;

  if (search)
    andCondition.push({
      OR: ["title", "author", "genre"].map((i) => ({
        [i]: {
          contain: search,
          mode: "insensitive",
        },
      })),
    });

    if (Object.keys(options).length > 0) {
      andCondition.push({
          AND: Object.entries(options).map(([key,value]) => ({
              [key]: {
                equals: value
              }
          }))
      });
  }

  const whereCondition:  Prisma.BookWhereInput =   andCondition.length > 0 ? { AND: andCondition } : {};

  const books = await prismaClient.book.findMany({where: whereCondition,
  });



  return books;
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
