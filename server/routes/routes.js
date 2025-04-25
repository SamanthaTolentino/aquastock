import express from 'express'
import { getFilteredFish } from '../controllers/fishController.js'

const router = express.Router()

router.get('/getFilteredFish', getFilteredFish)

export default router;