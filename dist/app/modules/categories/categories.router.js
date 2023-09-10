"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const categories_controller_1 = require("./categories.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.route('/create-category').post((0, auth_1.default)(client_1.Role.admin), categories_controller_1.CategoryController.insertCategory);
router.route('/')
    .get(categories_controller_1.CategoryController.findCategories);
router.route('/:id')
    .get(categories_controller_1.CategoryController.findOneCategory)
    .patch((0, auth_1.default)(client_1.Role.admin), categories_controller_1.CategoryController.updateCategory)
    .delete((0, auth_1.default)(client_1.Role.admin), categories_controller_1.CategoryController.deleteCategory);
exports.CategoryRouter = router;
