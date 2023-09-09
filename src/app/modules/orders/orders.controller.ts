import catchAsync from "../../../shared/catchAsync";
import responseData from "../../../shared/response";
import { IValidateUser } from "../auth/auth.interface"
import { OrderService } from "./orders.service";

const insertOrder = catchAsync(async (req, res) => {
  const order = req.body;
  const user = req.user as IValidateUser; 

  const result = await OrderService.insertOrder({...order, userId: user.userId});
  
  return responseData({ message: "Order created successfully", result }, res);
});


const findOneOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = req.user as IValidateUser;

  const result = await OrderService.findOneOrder(id, user);
  return responseData({ message: "User fetched successfully", result }, res);
});

const findOrders = catchAsync(async (req, res) => {
  
  const user = req.user as IValidateUser;

  const result = await OrderService.findOrders(user);
  return responseData({ message: "Orders retrieved successfully", result }, res);
});

export const OrderController = {
  insertOrder,
  findOneOrder,
  findOrders,
};
