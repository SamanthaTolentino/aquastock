import express from 'express'
import cors from 'cors'
import { getFish, getFilteredFish } from '../controllers/authController.js'

const router = express.Router()

// router.get('/', test)
router.get('/getFish', getFish)
router.get('/getFilteredFish', getFilteredFish)

export default router;