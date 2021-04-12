const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  idNumber: {
    type: Number,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type:String
  },
  date: {
    type: Date,
    default: Date.now
  },
  gender: {
    type: String
  },
  accessLevel:{
    type:Number
  },
  teamNum:{
    type:Number
  },
  payment: {
    type:Number,
    default: 0
  },
  dateOfBirth: {
    type: Date
  },
  SportType: {
    type: Number
  },
  city: {
    type: String
  },
  status: {
    type:Number
  }
});

module.exports = User = mongoose.model('user',UserSchema);