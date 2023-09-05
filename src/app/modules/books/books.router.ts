import express from 'express'
import { BookController } from './books.controller'

const router = express.Router()

router.route('/')
.get(BookController.findBooks).post(BookController.insertBook)

router.route('/:categoryId/category').get(BookController.findBookByCategory)
router.route('/:id')
.get(BookController.findOneBook)
.patch(BookController.updateBook)
.delete(BookController.deleteBook)

export const BookRouter = router