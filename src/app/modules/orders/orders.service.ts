import httpStatus from "http-status"
import prismaClient from "../../../shared/prisma-client"
import {Order, Role} from "@prisma/client";
import { IValidateUser } from "../auth/auth.interface"
import ApiError from "../../error/api-error"

const insertOrder = async (payload: Order): Promise<Order> => {
  const createdOrder = await prismaClient.order.create({
    data: payload
  })


  return createdOrder
}

const findOneOrder = async (id: string, payload: IValidateUser): Promise<Order | null> => {
  const orderExist = await prismaClient.order.findUnique({
    where: {
      id
    }
  })
  if(!orderExist)
   throw new ApiError(httpStatus.NOT_FOUND, 'Order does not exist!');

  if(payload.role === Role.admin)
  return orderExist

  if(payload.role === Role.customer && payload.userId !== orderExist?.userId){
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized!');
  }

  return orderExist
}

const findOrders = async (payload: IValidateUser): Promise<Order[]> => {
  
  if(payload.role === Role.admin)
    return await prismaClient.order.findMany({ })

  else if(payload.role === Role.customer)
  return await prismaClient.order.findMany({
  where: {
    userId: payload.userId
  }})

  return []
}




export const OrderService = {
  insertOrder,
  findOneOrder,
  findOrders
}