const { Schema } = require("mongoose")
const mongoose = require('mongoose')
// const {z} = require('zod')

// const User  = z.object({
//   username: z.string(),
// })

const userSchema  = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'we need a USERNAME']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minLength: [8, "expected 8 or more characters, got {VALUE}"],
  },
  picUrl: {
    type: String,
  },
  cars:[{
    type: Schema.Types.ObjectId,
    ref: 'Car,'
  }],
  location: String,
},  {timestamps: { createdAt: 'created_at'}})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel