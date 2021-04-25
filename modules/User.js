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
    type: String,
    required: true,
    unique:true
  },
  password: {
    type:String,
    required: true
  },
  accessLevel: {
    type:Number,
    default: 1
  },
  gender: {
    type: String
  },
  teamNum:{
    type:Number,
    required:true
  },
  payment: {
    type:Number,
    default: 0
  },
  dateOfBirth: {
    type: Date
  },
  city: {
    type: String
  },
  email: {
    type: String
  },
  status: {
    type:Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = User = mongoose.model('user',UserSchema);