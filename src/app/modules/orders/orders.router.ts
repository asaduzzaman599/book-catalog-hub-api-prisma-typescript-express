import express from 'express'
import { OrderController } from './orders.controller'
import { Role } from '@prisma/client'
import auth from '../../middlewares/auth'

const router = express.Router()

router.route('/create-order')
.post(auth(Role.customer), OrderController.insertOrder)

router.route('/')
.get(auth(Role.admin, Role.customer),OrderController.findOrders)

router.route('/:id')
.get(auth(Role.admin, Role.customer),OrderController.findOneOrder)

export const OrderRouter = router