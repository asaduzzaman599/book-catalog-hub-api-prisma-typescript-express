import httpStatus from "http-status"
import prismaClient from "../../../shared/prisma-client"
import {User} from "@prisma/client";
import ApiError from "../../error/api-error"

const insertUser = async (payload: User): Promise<User> => {
  const createdUser = await prismaClient.user.create({
    data: payload
  })


  return createdUser
}

const updateUser = async (id:string, payload: User): Promise<Omit<User,'password'> | null> => {
  
  const userExist = await prismaClient.user.findUnique({
    where: {
      id
    }
  })

  if(!userExist)
  throw new ApiError(httpStatus.NOT_FOUND, 'User not exists')

  const user = await prismaClient.user.update({
    where: {
      id
    },
    data: payload
  })
  const {password, ...userData} = user
  return userData
}
 
const deleteUser = async (id:string): Promise<User | null> => {
  
  const userExist = await prismaClient.user.findUnique({
    where: {
      id
    }
  })

  if(!userExist)
  throw new ApiError(httpStatus.NOT_FOUND, 'User not exists')

  const user = await prismaClient.user.delete({
    where: {
      id
    }
  })

  return userExist
}

const findOneUser = async (id: string): Promise<Omit<User,'password'> | null> => {
  const userExist = await prismaClient.user.findUnique({
    where: {
      id
    }
  })

  if(!userExist)
  throw new ApiError(httpStatus.NOT_FOUND, 'User not exists')

  const { password, ...userData } = userExist
  return userData
}

const findUsers = async (): Promise<Partial<User>[]> => {
  const users = await prismaClient.user.findMany({
    
  })
  return users?.map(i=>{
    const {password, ...user} = i
    return user
  })
}




export const UserService = {
  insertUser,
  updateUser,
  deleteUser,
  findOneUser,
  findUsers
}