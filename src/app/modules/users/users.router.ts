import express from 'express'
import { UserController } from './users.controller'
import auth from '../../middlewares/auth'
import { Role } from '@prisma/client'

const router = express.Router()

router.route('/')
.get(auth(Role.ADMIN), UserController.findUsers)

router.route('/:id')
.get(auth(Role.ADMIN), UserController.findOneUser)
.patch(auth(Role.ADMIN), UserController.updateUser)
.delete(auth(Role.ADMIN), UserController.deleteUser)

export const UserRouter = router