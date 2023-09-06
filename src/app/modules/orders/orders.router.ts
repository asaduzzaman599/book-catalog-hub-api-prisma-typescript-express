import express from 'express'
import { OrderController } from './orders.controller'
import { Role } from '@prisma/client'
import auth from '../../middlewares/auth'

const router = express.Router()

router.route('/create-order')
.post(auth(Role.CUSTOMER), OrderController.insertOrder)

router.route('/')
.get(auth(Role.ADMIN, Role.CUSTOMER),OrderController.findOrders)

router.route('/:id')
.get(auth(Role.ADMIN, Role.CUSTOMER),OrderController.findOneOrder)

export const OrderRouter = router