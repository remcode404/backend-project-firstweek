const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  usersName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  basket: [
    {
      productId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product"
      },
      amount:Number,
    },
  ],
  total: {type: Number, default: 0},

})

const User = mongoose.model('User', userSchema)

module.exports = User