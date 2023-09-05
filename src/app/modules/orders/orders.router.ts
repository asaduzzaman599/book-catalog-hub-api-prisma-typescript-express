import express from 'express'
import { OrderController } from './orders.controller'

const router = express.Router()

router.route('/create-order')
.post(OrderController.insertOrder)

router.route('/')
.get(OrderController.findOrders)

router.route('/:id')
.get(OrderController.findOneOrder)

export const OrderRouter = router