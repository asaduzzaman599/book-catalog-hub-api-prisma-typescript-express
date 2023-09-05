import express from 'express'
import { CategoryController } from './categories.controller'

const router = express.Router()

router.route('/')
.get(CategoryController.findCategories).post(CategoryController.insertCategory)

router.route('/:id')
.get(CategoryController.findOneCategory)
.patch(CategoryController.updateCategory)
.delete(CategoryController.deleteCategory)

export const CategoryRouter = router