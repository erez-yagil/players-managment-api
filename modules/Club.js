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
  managerName: {
    type: String,
    required: true
  },
  startDateActivity: {
    type: Date
  },
  city: {
    type: String
  },
  email: {
    type: String
  },
  phoneNum: {
    type: String
  }
});

module.exports = Club = mongoose.model('club',ClubSchema);