import httpStatus from "http-status"
import prismaClient from "../../../shared/prisma-client"
import {Book} from "@prisma/client";

const insertBook = async (payload: Book): Promise<Book> => {
  const createdBook = await prismaClient.book.create({
    data: payload
  })


  return createdBook
}

const updateBook = async (id:string, payload: Book): Promise<Book | null> => {
  
  const bookExist = await prismaClient.book.findUnique({
    where: {
      id
    }
  })

  if(!bookExist)
  console.log(httpStatus.NOT_FOUND, 'Book not exists')

  const book = await prismaClient.book.update({
    where: {
      id
    },
    data: payload
  })

  return book
}
 
const deleteBook = async (id:string): Promise<Book | null> => {
  
  const bookExist = await prismaClient.book.findUnique({
    where: {
      id
    }
  })

  if(!bookExist)
  console.log(httpStatus.NOT_FOUND, 'Book not exists')

  const book = await prismaClient.book.delete({
    where: {
      id
    }
  })

  return bookExist
}

const findOneBook = async (id: string): Promise<Book | null> => {
  const bookExist = await prismaClient.book.findUnique({
    where: {
      id
    }
  })

  if(!bookExist)
  console.log(httpStatus.NOT_FOUND, 'Book not exists')

  return bookExist
}

const findBooks = async (): Promise<Book[]> => {
  const books = await prismaClient.book.findMany({
  })

  return books
}

const findBookByCategory = async (id:string): Promise<Book[]> => {
  const books = await prismaClient.book.findMany({
    where: {
      categoryId: id
    }
  })

  return books
}




export const BookService = {
  insertBook,
  updateBook,
  deleteBook,
  findOneBook,
  findBooks,
  findBookByCategory
}