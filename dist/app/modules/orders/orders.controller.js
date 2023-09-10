"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const response_1 = __importDefault(require("../../../shared/response"));
const orders_service_1 = require("./orders.service");
const insertOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    const user = req.user;
    const result = yield orders_service_1.OrderService.insertOrder(Object.assign(Object.assign({}, order), { userId: user.userId }));
    return (0, response_1.default)({ message: "Order created successfully", result }, res);
}));
const findOneOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.user;
    const result = yield orders_service_1.OrderService.findOneOrder(id, user);
    return (0, response_1.default)({ message: "User fetched successfully", result }, res);
}));
const findOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield orders_service_1.OrderService.findOrders(user);
    return (0, response_1.default)({ message: "Orders retrieved successfully", result }, res);
}));
exports.OrderController = {
    insertOrder,
    findOneOrder,
    findOrders,
};
