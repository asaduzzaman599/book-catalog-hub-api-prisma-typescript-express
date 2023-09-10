"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.route('/')
    .get((0, auth_1.default)(client_1.Role.admin), users_controller_1.UserController.findUsers);
router.route('/:id')
    .get((0, auth_1.default)(client_1.Role.admin), users_controller_1.UserController.findOneUser)
    .patch((0, auth_1.default)(client_1.Role.admin), users_controller_1.UserController.updateUser)
    .delete((0, auth_1.default)(client_1.Role.admin), users_controller_1.UserController.deleteUser);
exports.UserRouter = router;
