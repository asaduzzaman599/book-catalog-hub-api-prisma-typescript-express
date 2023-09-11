"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_router_1 = require("../app/modules/users/users.router");
const auth_router_1 = require("../app/modules/auth/auth.router");
const categories_router_1 = require("../app/modules/categories/categories.router");
const books_router_1 = require("../app/modules/books/books.router");
const orders_router_1 = require("../app/modules/orders/orders.router");
const profile_router_1 = require("../app/modules/profile/profile.router");
const router = express_1.default.Router();
const routes = [
    { path: '/users', module: users_router_1.UserRouter },
    { path: '/auth', module: auth_router_1.AuthRouter },
    { path: '/categories', module: categories_router_1.CategoryRouter },
    { path: '/books', module: books_router_1.BookRouter },
    { path: '/orders', module: orders_router_1.OrderRouter },
    { path: '/profile', module: profile_router_1.ProfileRouter },
];
routes.forEach(route => {
    router.use(route.path, route.module);
});
exports.AppRouter = router;
