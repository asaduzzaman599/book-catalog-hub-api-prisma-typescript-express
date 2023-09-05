import httpStatus from "http-status"
import prismaClient from "../../../shared/prisma-client"
import {Category, User} from "@prisma/client";

const insertCategory = async (payload: Category): Promise<Category> => {
  const createdUser = await prismaClient.category.create({
    data: payload
  })


  return createdUser
}

const updateCategory = async (id:string, payload: Category): Promise<Category | null> => {
  
  const categoryExist = await prismaClient.category.findUnique({
    where: {
      id
    }
  })

  if(!categoryExist)
  console.log(httpStatus.NOT_FOUND, 'User not exists')

  const category = await prismaClient.category.update({
    where: {
      id
    },
    data: payload
  })

  return category
}
 
const deleteCategory = async (id:string): Promise<Category | null> => {
  
  const categoryExist = await prismaClient.category.findUnique({
    where: {
      id
    }
  })

  if(!categoryExist)
  console.log(httpStatus.NOT_FOUND, 'User not exists')

  const category = await prismaClient.user.delete({
    where: {
      id
    }
  })

  return categoryExist
}

const findOneCategory = async (id: string): Promise<User | null> => {
  const userExist = await prismaClient.user.findUnique({
    where: {
      id
    }
  })

  if(!userExist)
  console.log(httpStatus.NOT_FOUND, 'User not exists')

  return userExist
}

const findCategories = async (): Promise<User[]> => {
  const users = await prismaClient.user.findMany({
  })

  return users
}




export const CategoryService = {
  insertCategory,
  updateCategory,
  deleteCategory,
  findOneCategory,
  findCategories
}