import express from 'express'
import { BookController } from './books.controller'
import { Role } from '@prisma/client'
import auth from '../../middlewares/auth'

const router = express.Router()

router.route('/')
.get(BookController.findBooks).post(auth(Role.ADMIN), BookController.insertBook)

router.route('/:categoryId/category').get(BookController.findBookByCategory)
router.route('/:id')
.get(BookController.findOneBook)
.patch(auth(Role.ADMIN), BookController.updateBook)
.delete(auth(Role.ADMIN), BookController.deleteBook)

export const BookRouter = router