const express = require('express')
const router = express.Router()
const cors = require('cors')

const { getFish, getFilteredFish } = require('../controllers/authController')

// middleware
router.use(
  cors({
    credentials: true,
    origin: 'https://aquastock.onrender.com'
  })
)

// router.get('/', test)
router.get('/getFish', getFish)
router.get('/getFilteredFish', getFilteredFish)

module.exports = router