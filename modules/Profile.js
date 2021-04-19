const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'club'
  },
  idNumber: {
    type: String,
    unique:true
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
  SportType: {
    type: Number
  },
  city: {
    type: String
  },
  status: {
    type:Number,
    default: 0
  }
});

module.exports = Profile = mongoose.model('profile',ProfileSchema);