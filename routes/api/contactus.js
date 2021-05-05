const express = require('express');
const router = express.Router();
const { checkSchema , validationResult } = require('express-validator');
const ContactUsMessage = require('../../modules/contactUs');
const auth = require('../../middleware/auth');


// Add message //

router.post('/',

// Validate inputs //

checkSchema({
  name: {
    trim: true,
    not:true,
    isEmpty:true,
    toLowerCase:true,
    errorMessage:'Please insert name'
  },
  email: {
    trim: true,
    isEmail:true,
    not:true,
    isEmpty:true,
    errorMessage:'Please insert invalid email'
  },
  message: {
    trim: true,
    not:true,
    isEmpty:true,
    toLowerCase:true,
    errorMessage:'Please insert a message'
  }
  
}) ,async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
    return res.status(400).json({ errors:errors.array() })
    }

    const { 
      name, 
      email,
      message,
    } = req.body;

    try {
      helpMessage = new ContactUsMessage({
        name, 
        email,
        message,
    })

    await helpMessage.save();
    res.send(helpMessage)


  } catch (error){
    console.error(error);
    res.status(500).send('Server error')
  }
});

module.exports = router;
