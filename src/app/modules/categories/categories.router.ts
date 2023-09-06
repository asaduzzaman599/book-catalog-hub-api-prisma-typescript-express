import express from 'express'
import { CategoryController } from './categories.controller'
import { Role } from '@prisma/client'
import auth from '../../middlewares/auth'

const router = express.Router()

router.route('/')
.get(CategoryController.findCategories).post(auth(Role.ADMIN), CategoryController.insertCategory)

router.route('/:id')
.get(CategoryController.findOneCategory)
.patch(auth(Role.ADMIN), CategoryController.updateCategory)
.delete(auth(Role.ADMIN), CategoryController.deleteCategory)

export const CategoryRouter = router