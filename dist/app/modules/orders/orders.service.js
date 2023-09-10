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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_client_1 = __importDefault(require("../../../shared/prisma-client"));
const client_1 = require("@prisma/client");
const api_error_1 = __importDefault(require("../../error/api-error"));
const insertOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdOrder = yield prisma_client_1.default.order.create({
        data: payload
    });
    return createdOrder;
});
const findOneOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderExist = yield prisma_client_1.default.order.findUnique({
        where: {
            id
        }
    });
    if (!orderExist)
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, 'Order does not exist!');
    if (payload.role === client_1.Role.admin)
        return orderExist;
    if (payload.role === client_1.Role.customer && payload.userId !== (orderExist === null || orderExist === void 0 ? void 0 : orderExist.userId)) {
        throw new api_error_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized!');
    }
    return orderExist;
});
const findOrders = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.role === client_1.Role.admin)
        return yield prisma_client_1.default.order.findMany({});
    else if (payload.role === client_1.Role.customer)
        return yield prisma_client_1.default.order.findMany({
            where: {
                userId: payload.userId
            }
        });
    return [];
});
exports.OrderService = {
    insertOrder,
    findOneOrder,
    findOrders
};
