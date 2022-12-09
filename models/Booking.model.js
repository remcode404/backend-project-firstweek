const mongoose = require('mongoose')
const { SchemaTypes } = require("mongoose");

const bookingSchema = mongoose.Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    ref: 'User'
  },
  numberTable: Number,
  nameUser: String,
  numberUser: String, 
  date: String,
  time: String
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking