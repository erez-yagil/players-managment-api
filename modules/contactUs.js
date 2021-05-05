const mongoose = require('mongoose');

const ContactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  active: {
    type:Boolean,
    default:true
  },
  date: {
    type:Date,
    default:Date.now()
  }
});

module.exports = ContactUs = mongoose.model('contactUs',ContactUsSchema);