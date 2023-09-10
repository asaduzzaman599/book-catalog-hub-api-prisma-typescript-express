import express from 'express'
import { ProfileController } from './profile.controller'
import auth from '../../middlewares/auth'
import { Role } from '@prisma/client'

const router = express.Router()

router.get('/', auth(Role.admin,Role.customer),ProfileController.findUserProfile)

export const ProfileRouter = router