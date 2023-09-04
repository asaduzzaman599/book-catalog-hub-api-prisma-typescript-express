import catchAsync from "../../../shared/catchAsync";
import responseData from "../../../shared/response";
import { UserService } from "./users.service";

const insertUser = catchAsync((req, res) => {
  const user = req.body;

  const result = UserService.insertUser(user);
  
  return responseData({ message: "User inserted  successfully", result }, res);
});

const updateUser = catchAsync((req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = UserService.updateUser(id, data);

  return responseData({ message: "User updated  successfully", result }, res);
});

const deleteUser = catchAsync((req, res) => {
  const id = req.params.id;

  const result = UserService.deleteUser(id);

  return responseData({ message: "User deleted  successfully", result }, res);
});

const findOneUser = catchAsync((req, res) => {
  const id = req.params.id;

  const result = UserService.findOneUser(id);
  return responseData({ message: "User fetched successfully", result }, res);
});

const findUsers = catchAsync((req, res) => {
  const result = UserService.findUsers();
  return responseData({ message: "Users retrieved successfully", result }, res);
});

export const UserController = {
  insertUser,
  updateUser,
  deleteUser,
  findOneUser,
  findUsers,
};
