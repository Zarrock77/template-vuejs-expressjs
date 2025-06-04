import testRouter from './test'
import { Router } from 'express'

const router = Router()

router.use('/', testRouter)

export default router
