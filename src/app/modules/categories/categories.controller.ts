import catchAsync from "../../../shared/catchAsync";
import responseData from "../../../shared/response";
import { CategoryService } from "./categories.service";

const insertCategory = catchAsync((req, res) => {
  const category = req.body;

  const result = CategoryService.insertCategory(category);
  
  return responseData({ message: "Category inserted  successfully", result }, res);
});

const updateCategory = catchAsync((req, res) => {
  const id = req.params.id;
  const data = req.body;

  const result = CategoryService.updateCategory(id, data);

  return responseData({ message: "Category updated  successfully", result }, res);
});

const deleteCategory = catchAsync((req, res) => {
  const id = req.params.id;

  const result = CategoryService.deleteCategory(id);

  return responseData({ message: "Category deleted  successfully", result }, res);
});

const findOneCategory = catchAsync((req, res) => {
  const id = req.params.id;

  const result = CategoryService.findOneCategory(id);
  return responseData({ message: "Category fetched successfully", result }, res);
});

const findCategories = catchAsync((req, res) => {
  const result = CategoryService.findCategories();
  return responseData({ message: "Categories retrieved successfully", result }, res);
});

export const CategoryController = {
  insertCategory,
  updateCategory,
  deleteCategory,
  findOneCategory,
  findCategories,
};
