import express from 'express'
import { UserController } from './users.controller'
import auth from '../../middlewares/auth'
import { Role } from '@prisma/client'

const router = express.Router()

router.route('/')
.get(auth(Role.admin), UserController.findUsers)

router.route('/:id')
.get(auth(Role.admin), UserController.findOneUser)
.patch(auth(Role.admin), UserController.updateUser)
.delete(auth(Role.admin), UserController.deleteUser)

export const UserRouter = router