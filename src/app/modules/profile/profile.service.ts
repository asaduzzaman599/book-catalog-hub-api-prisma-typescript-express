import httpStatus from "http-status"
import prismaClient from "../../../shared/prisma-client"
import ApiError from "../../error/api-error"
import { IValidateUser } from "../auth/auth.interface"

const findUser = async (payload: IValidateUser) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: payload.userId
    }
  })
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!')
  return user
}

export const ProfileService = {
  findUser
}