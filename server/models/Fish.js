import mongoose from 'mongoose'
const {Schema} = mongoose

const fishSchema = new Schema({
  name: String,
  tankSize: String,
},)

export const Fish = mongoose.model('fish', fishSchema)