const express = require('express')
const router = express.Router()
const cors = require('cors')

const { test, getFish, getFilteredFish } = require('../controllers/authController')

// middleware
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)

router.get('/', test)
router.get('/getFish', getFish)
router.get('/getFilteredFish', getFilteredFish)

module.exports = router