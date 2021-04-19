const express = require('express');
const router = express.Router();
const { checkSchema , validationResult } = require('express-validator');
const User = require('../../modules/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

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
    }
  })

  , async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors:errors.array() })
  }

  const { firstName,lastName,email,idNumber,password,accessLevel } = req.body;
  
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors:[{ msg: 'User already exits' }] });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
      accessLevel
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


// Delete User && profile by id //

router.delete('/user/:id', async (req, res)=>{
  
  try {
    const profile = await Profile.findOneAndRemove({
      user: req.params.id})
    const user = await User.findByIdAndRemove(req.params.id);

    if(!user) return res.status(400).send('No user found');
    if(!profile) return res.status(400).send('No profile found');

    res.send(`User ${user.firstName} ${user.lastName} deleted`);
    res.send(`profile deleted`);

  } catch (error){
    console.error(error);

    if (error.kind == 'ObjectId') return res.status(400).send('No user found');
    res.status(500).send('Server error')
  }
})

// Delete my profile && user //

router.delete('/me', auth, async (req, res)=> {
  try {
    const profile = await Profile.findOneAndRemove({
      user: req.user.id});
    const user = await User.findOneAndRemove({
      _id:req.user.id
    });
    
    
    res.json('user deleted');

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})

// Get my user //


router.get('/me', auth, async (req, res)=> {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(400).json({ msg: 'There is no user' })
    }

    res.json(user);

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})


// Get all users user //

router.get('/all', auth, async (req, res)=> {
  try {
    const users = await User.find();
    
    if (!users) {
      return res.status(400).json({ msg: 'There is no users' })
    }

    res.json(users);

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})







module.exports = router;
