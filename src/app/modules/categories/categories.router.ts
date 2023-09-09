import express from 'express'
import { CategoryController } from './categories.controller'
import { Role } from '@prisma/client'
import auth from '../../middlewares/auth'

const router = express.Router()

router.route('/create-category').post(auth(Role.admin), CategoryController.insertCategory)

router.route('/')
.get(CategoryController.findCategories).post(auth(Role.admin), CategoryController.insertCategory)

router.route('/:id')
.get(CategoryController.findOneCategory)
.patch(auth(Role.admin), CategoryController.updateCategory)
.delete(auth(Role.admin), CategoryController.deleteCategory)

export const CategoryRouter = router