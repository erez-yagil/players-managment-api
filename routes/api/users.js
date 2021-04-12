const express = require('express');
const router = express.Router();
const { checkSchema , validationResult } = require('express-validator');
const User = require('../../modules/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Add user //

router.post(
  '/',

  // user input validation //

  checkSchema({
    firstName: {
      trim: true,
      not:true,
      isEmpty:true,
      toLowerCase:true,
      errorMessage:'Please insert first name'
    },
    lastName: {
      trim: true,
      not:true,
      isEmpty:true,
      toLowerCase:true,
      errorMessage:'Please insert last name'
    },
    email: {
      trim:true,
      isEmail:true,
      normalizeEmail:true,
      toLowerCase:true,
      errorMessage:'Please insert a valid email'
    },
    idNumber: {
      trim:true,
      isInt:true,
      isLength: {
        options:{min:7, max:9}
      },
      errorMessage: ' Please insert a valid ID'
    },
    gender: {
    trim:true,
    toLowerCase:true
    },
    city: {
      trim:true,
      toLowerCase:true
      }    
  })
  , async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors:errors.array() })
  }

  const { firstName,lastName,email,idNumber,password,accessLevel,gender,teamNum,payment,dateOfBirth,SportType,city,status } = req.body;
  
  try {
    let user = await User.findOne({ idNumber });

    if (user) {
      return res.status(400).json({ errors:[{ msg: 'User already exits' }] });
    }

    user = new User({
      firstName,
      lastName,
      idNumber,
      email,
      password:idNumber,
      accessLevel,
      gender,
      teamNum,
      payment,
      dateOfBirth,
      SportType,
      city,
      status
    })

    const salt  = await bcrypt.genSalt(8);
    user.password = await bcrypt.hash('user-password', salt)

    await user.save();

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
})


// Update User by id //

router.patch('/:id', async (req, res)=>{
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName'];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update));

  if (!isValidUpdate) return res.status(400).send('error: Invalid updates')
  
  try{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
       new:true,
       runValidators:true
    });

    if(!user) return res.status(400).send('No user found');

    res.send(user);


  } catch (error){
    console.error(error);

    if (error.kind == 'ObjectId') return res.status(400).send('No user found');
    res.status(500).send('Server error')
  }
})


// Delete User by id //

router.delete('/:id', async (req, res)=>{
  

  try{
    const user = await User.findByIdAndRemove(req.params.id);

    if(!user) return res.status(400).send('No user found');

    res.send(`User ${user.firstName} ${user.lastName} deleted`);

  } catch (error){
    console.error(error);

    if (error.kind == 'ObjectId') return res.status(400).send('No user found');
    res.status(500).send('Server error')
  }
})




module.exports = router;