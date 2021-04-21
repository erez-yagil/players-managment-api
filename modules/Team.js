const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true
  },
  teamCategory: {
    type: Number,
    required: true
  },
  teamNum: {
    type: Number,
    required: true,
    unique:true
  },
  ligueLevel: {
    type: Number,
    required: true
  },
  ageCategory: {
    type: Number,
    required: true
  },
  clubNum: {
    type: Number,
    required: true
  },
  coachName: {
    type: String
  },
  details: {
    type: String
  }
});

module.exports = Team = mongoose.model('team',TeamSchema);