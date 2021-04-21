const express = require('express');
const router = express.Router();
const { checkSchema , validationResult } = require('express-validator');
const Club = require('../../modules/Club');
const auth = require('../../middleware/auth');


// Add Club //

router.post('/',

// Validate inputs //
checkSchema({
  clubName: {
    trim: true,
    not:true,
    isEmpty:true,
    toLowerCase:true,
    errorMessage:'Please insert club name'
  },
  clubNum: {
    trim: true,
    isInt:true,
    not:true,
    isEmpty:true,
    errorMessage:'Please insert club number'
  },
  amutaNum: {
    trim: true,
    isInt:true,
    not:true,
    isEmpty:true,
    errorMessage:'Please insert Amuta number'
  },
  presidentName: {
    toLowerCase:true,
    errorMessage:'Please insert a president name'

  },
  ceoName: {
    toLowerCase:true,
    errorMessage:'Please insert a valid CEO name'

  },
  startDateActivity: {
    toDate:true,
    errorMessage:'Please insert a valid date'
  },
  city: {
    trim: true,
    not:true,
    isEmpty:true,
    toLowerCase:true,
    errorMessage:'Please insert city'
  },
  email: {
    trim:true,
    required:false,
    isEmail:true,
    normalizeEmail:true,
    toLowerCase:true,
    errorMessage:'Please insert a valid email'
  }, 
  phoneNum: {
    trim: true,
    errorMessage:'Please insert a valid phone number'

  },
  website: {
    trim:true,
    errorMessage:'Please insert a valid website'

  }
}) ,async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
    return res.status(400).json({ errors:errors.array() })
    }

    const { 
      clubName,
      clubNum,
      amutaNum,
      presidentName,
      ceoName,
      startDateActivity,
      city,
      email,
      phoneNum,
      website
    } = req.body;

    try {
    let club = await Club.findOne({ clubNum });

    if(club) return res.status(400).json({ errors:[{ msg: 'Club already exits' }] });

    club = new Club({
      clubName,
      clubNum,
      amutaNum,
      presidentName,
      ceoName,
      startDateActivity,
      city,
      email,
      phoneNum,
      website
    })

    await club.save();
    res.send('Club added')


  } catch (error){
    console.error(error);
    res.status(500).send('Server error')
  }
})

// Update Club by id // 

router.patch('/:id', async (req, res)=>{
  
  try{
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
       new:true,
       runValidators:true
    });

    if(!club) return res.status(400).send('No club found');

    res.send(club);


  } catch (error){
    console.error(error);

    if (error.kind == 'ObjectId') return res.status(400).send('No user found');
    return res.status(500).send('Server error')
  }
})


// Delete Club by id //

router.delete('/:id', async (req, res)=>{
  

  try{
    const club = await Club.findByIdAndRemove(req.params.id);

    if(!club) return res.status(400).send('No club found');

    res.send(`club ${club.clubName} deleted`);

  } catch (error){
    console.error(error);

    if (error.kind == 'ObjectId') return res.status(400).send('No club found');
    return res.status(500).send('Server error')
  }
})

// Get Club by Id //

router.get('/:id', async (req, res)=> {
  try {
    const club = await Club.findById(req.params.id);
    
    if (!club) {
      return res.status(400).json({ msg: 'There is no club' })
    }

    res.json(club);

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})


// Get All Clubs //

router.get('/', async (req, res)=> {
  try {
    const clubs = await Club.find();
    
    if (!clubs) {
      return res.status(400).json({ msg: 'There is no club' })
    }

    res.json(clubs);

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})




module.exports = router;