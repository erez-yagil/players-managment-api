const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../modules/User')
const bcrypt = require('bcryptjs');
const { checkSchema , validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');


router.get('/', auth, async (req, res)=> {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})

router.post(
  '/',
  
  checkSchema({
    email: {
      trim:true,
      isEmail:true,
      normalizeEmail:true,
      toLowerCase:true,
      errorMessage:'Please insert a valid email'
    },
    password: {
      exists:true
  }}),

  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors:errors.array() })
  }

  const { email,password } = req.body;
  
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors:[{ msg: 'Invalid email/password' }] });
    }

    const isMatch = bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({
        errors:[{ msg:'Invalid email/password2' }]
      })
    }
    
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 300000 },
      (error, token) => {
        if(error){
          throw error
        }
        res.json({ token })
      }
    );

  } catch (e) {
    console.error(e);
    res.status(500).send('Server error')
  }


 console.log(req.body)
})


module.exports = router;