const express = require('express');
const router = express.Router();
const { checkSchema , validationResult } = require('express-validator');
const Profile = require('../../modules/Profile');
const User = require('../../modules/User');
const config = require('config');
const auth = require('../../middleware/auth');

// Add and Update Profile //

router.post(
  '/',

  // user input validation //

  checkSchema({
    idNumber: {
      trim: true,
      not:true,
      isEmpty:true,
      errorMessage:'Please insert Id number'
    },
    gender: {
      not:true,
      isEmpty:true,
      errorMessage:'Please insert gender'
    },
    teamNum: {
      trim: true,
      not:true,
      isEmpty:true,
      errorMessage:'Please insert Id Team Number'
    },
    dateOfBirth: {
      trim: true,
      not:true,
      isEmpty:true,
      errorMessage:'Please insert Date of birth'
    },
    SportType: {
      type: Number
    },
    city: {
      trim: true
    }
  })

  ,auth,  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors:errors.array() })
  }

  const { idNumber,
          gender,
          teamNum,
          payment,
          dateOfBirth,
          SportType,
          city,
          status 
        } = req.body;
  
  // Create Profile Object //

  const profileFields = {};
  profileFields.user = req.user.id;
  if(idNumber) profileFields.idNumber = idNumber;
  if(gender) profileFields.gender = gender;
  if(teamNum) profileFields.teamNum = teamNum;
  if(payment) profileFields.payment = payment;
  if(dateOfBirth) profileFields.dateOfBirth = dateOfBirth;
  if(SportType) profileFields.SportType = SportType;
  if(city) profileFields.city = city;
  if(status) profileFields.status = status;


  try {
    let profile = await Profile.findOne({ user:req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user:req.user.id },
        { $set:profileFields},
        { new:true }
      );

      return res.json(profile);
    }
    
    profile = new Profile(profileFields);
    await profile.save();
    return res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})


// Get my profile //

router.get('/user/me', auth, async (req, res)=> {
  try {
    const profile = await Profile.findOne({user:req.user.id});
    
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile' })
    }

    res.json(profile);

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})


// Get profile by id //

router.get('/user/:id', async (req, res)=> {
  try {
    const profile = await Profile.findOne({
      user:req.params.id
    }).populate('user', ['firstName', 'lastName']);
    
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile' })
    }

    res.json(profile);

  } catch(error) {
    console.error(error.message);
    if(error.kind =='ObjectId') {
      return res.status(400).json({ msg: 'There is no profile' })
    }
    res.status(500).send('Server Error')
  }
})

// Get all profile //

router.get('/', async (req, res)=> {
  try {
    const profile = await Profile.find().populate('user', ['firstName', 'lastName']);
    
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile' })
    }

    res.json(profile);

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})


module.exports = router;