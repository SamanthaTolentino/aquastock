const Fish = require('../models/Fish')

const getFish = async (req, res) => {
  try {
    const fishes = await Fish.find()
    return res.json(fishes)
  }
  catch (err) {
    console.log(err)
  }
} 

const getFilteredFish = async (req, res) => {
  try {
    const tankSize = req.query.tankSize
    const temperament = req.query.temperament
    const difficulty = req.query.difficulty

    if (!tankSize || !temperament || !difficulty) {
      return res.json({
        error: 'Please make sure all fields are filled!'
      })
    }

    const fishes = await Fish.find({tankSize: tankSize, temperament: temperament, difficulty: difficulty})
    return res.json(fishes)
  }
  catch (err) {
    console.log(err)
  }
}

module.exports = {
  getFish,
  getFilteredFish
}