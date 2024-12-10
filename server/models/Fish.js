const mongoose = require('mongoose')
const {Schema} = mongoose

const fishSchema = new Schema({
  name: String,
  tankSize: String,
},)

const FishModel = mongoose.model('fish', fishSchema)

module.exports = FishModel