"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.route('/create-order')
    .post((0, auth_1.default)(client_1.Role.customer), orders_controller_1.OrderController.insertOrder);
router.route('/')
    .get((0, auth_1.default)(client_1.Role.admin, client_1.Role.customer), orders_controller_1.OrderController.findOrders);
router.route('/:id')
    .get((0, auth_1.default)(client_1.Role.admin, client_1.Role.customer), orders_controller_1.OrderController.findOneOrder);
exports.OrderRouter = router;
