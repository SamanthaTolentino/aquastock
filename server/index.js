const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const cors = require('cors')
const {mongoose} = require('mongoose')

// Connect to database
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((error) => console.log('Database not connected', error))

const app = express()

__dirname = path.resolve()

// middleware
app.use(cors())
app.use(express.json())

app.use('/', require('./routes/authRoutes'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')))

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

const port = 8000
app.listen(port, () => console.log(`Server is running on port ${port}`))