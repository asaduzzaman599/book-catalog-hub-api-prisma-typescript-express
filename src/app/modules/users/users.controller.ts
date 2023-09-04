import catchAsync from "../../../shared/catchAsync"
import { UserService } from "./users.service"

const insertUser = catchAsync((req, res)=> {
  const user = req.body

  const result = UserService.insertUser(user)
})

const updateUser = catchAsync((req, res)=> {
  const id = req.params.id
  const data = req.body

  const result = UserService.updateUser(id, data)
})

const deleteUser = catchAsync((req, res)=> {
  const id = req.params.id

  const result = UserService.deleteUser(id)
})

const findOneUser = catchAsync((req, res)=> {
  const id = req.params.id

  const result = UserService.findOneUser(id)
})

const findUsers = catchAsync((req, res)=> {

  const result = UserService.findUsers()
})

export const UserController = {
  insertUser,
  updateUser,
  deleteUser,
  findOneUser,
  findUsers,

}