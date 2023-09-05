import catchAsync from "../../../shared/catchAsync";
import responseData from "../../../shared/response";
import { IValidateUser } from "../auth/auth.interface"
import { OrderService } from "./orders.service";

const insertOrder = catchAsync((req, res) => {
  const order = req.body;
  const user = req.user as IValidateUser; 

  const result = OrderService.insertOrder({...order, userId: user.userId});
  
  return responseData({ message: "Order created successfully", result }, res);
});


const findOneOrder = catchAsync((req, res) => {
  const id = req.params.id;
  const user = req.user as IValidateUser;

  const result = OrderService.findOneOrder(id, user);
  return responseData({ message: "User fetched successfully", result }, res);
});

const findOrders = catchAsync((req, res) => {
  
  const user = req.user as IValidateUser;

  const result = OrderService.findOrders(user);
  return responseData({ message: "Orders retrieved successfully", result }, res);
});

export const OrderController = {
  insertOrder,
  findOneOrder,
  findOrders,
};
