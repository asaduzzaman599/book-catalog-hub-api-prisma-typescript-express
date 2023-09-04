import express from 'express'
import { UserController } from './users.controller'

const router = express.Router()

router.route('/')
.get(UserController.findUsers)

router.route('/:id')
.get(UserController.findOneUser)
.patch(UserController.updateUser)
.delete(UserController.deleteUser)

export const UserRouter = router