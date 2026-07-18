// @/models.js
import mongoose from 'mongoose'

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  isGoodBoy: {
    type: Boolean,
    required: false,
    default: true
  }
})

const Dog = mongoose.model('Dog', DogSchema)

export default   Dog 