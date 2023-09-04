import httpStatus from "http-status"
import prismaClient from "../../../shared/prisma-client"
import {User} from "@prisma/client";

const insertUser = async (payload: User): Promise<User> => {
  const createdUser = await prismaClient.user.create({
    data: payload
  })


  return createdUser
}

const updateUser = async (id:string, payload: User): Promise<User | null> => {
  
  const userExist = await prismaClient.user.findUnique({
    where: {
      id
    }
  })

  if(!userExist)
  console.log(httpStatus.NOT_FOUND, 'User not exists')

  const user = await prismaClient.user.update({
    where: {
      id
    },
    data: payload
  })

  return user
}
 
const deleteUser = async (id:string): Promise<User | null> => {
  
  const userExist = await prismaClient.user.findUnique({
    where: {
      id
    }
  })

  if(!userExist)
  console.log(httpStatus.NOT_FOUND, 'User not exists')

  const user = await prismaClient.user.delete({
    where: {
      id
    }
  })

  return userExist
}

const findOneUser = async (id: string): Promise<User | null> => {
  const userExist = await prismaClient.user.findUnique({
    where: {
      id
    }
  })

  if(!userExist)
  console.log(httpStatus.NOT_FOUND, 'User not exists')

  return userExist
}

const findUsers = async (): Promise<User[]> => {
  const user = await prismaClient.user.findMany({

  })


  return user
}




export const UserService = {
  insertUser,
  updateUser,
  deleteUser,
  findOneUser,
  findUsers
}