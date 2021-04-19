const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true
  },
  clubNum: {
    type: Number,
    required: true,
    unique:true
  },
  amutaNum: {
    type: Number,
    required: true,
  },
  presidentName: {
    type: String
  },
  ceoName: {
    type: String
  },
  startDateActivity: {
    type: Date
  },
  city: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phoneNum: {
    type: String
  },
  website: {
    type: String
  }
});

module.exports = Club = mongoose.model('club',ClubSchema);