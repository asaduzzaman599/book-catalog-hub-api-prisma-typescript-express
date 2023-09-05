import httpStatus from "http-status"
import prismaClient from "../../../shared/prisma-client"
import {Category} from "@prisma/client";

const insertCategory = async (payload: Category): Promise<Category> => {
  const categoryExist = await prismaClient.category.findFirst({
    where: {
      title: payload.title
    }
  })
  if(categoryExist) console.log(httpStatus.CONFLICT,'Category already exist!')
  const createdCategory = await prismaClient.category.create({
    data: payload
  })


  return createdCategory
}

const updateCategory = async (id:string, payload: Category): Promise<Category | null> => {
  
  const categoryExist = await prismaClient.category.findUnique({
    where: {
      id
    }
  })

  if(!categoryExist)
  console.log(httpStatus.NOT_FOUND, 'Category not exists')

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
  console.log(httpStatus.NOT_FOUND, 'Category not exists')

  const category = await prismaClient.category.delete({
    where: {
      id
    }
  })

  return categoryExist
}

const findOneCategory = async (id: string): Promise<Category | null> => {
  const categoryExist = await prismaClient.category.findUnique({
    where: {
      id
    }
  })

  if(!categoryExist)
  console.log(httpStatus.NOT_FOUND, 'Category not exists')

  return categoryExist
}

const findCategories = async (): Promise<Category[]> => {
  const categories = await prismaClient.category.findMany({
  })

  return categories
}




export const CategoryService = {
  insertCategory,
  updateCategory,
  deleteCategory,
  findOneCategory,
  findCategories
}