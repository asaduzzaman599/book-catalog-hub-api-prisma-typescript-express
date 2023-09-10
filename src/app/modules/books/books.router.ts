import express from 'express'

import { Role } from '@prisma/client'
import auth from '../../middlewares/auth'
import { BookController } from './books.controller'

const router = express.Router()

router.route('/create-book').post(auth(Role.admin), BookController.insertBook)

router.route('/').get(BookController.findBooks)

router.route('/:categoryId/category').get(BookController.findBookByCategory)
router.route('/:id')
.get(BookController.findOneBook)
.patch(auth(Role.admin), BookController.updateBook)
.delete(auth(Role.admin), BookController.deleteBook)

export const BookRouter = router