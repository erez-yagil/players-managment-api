const express = require('express');
const router = express.Router();
const { checkSchema , validationResult } = require('express-validator');
const Club = require('../../modules/Club');

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
    not:true,
    isEmpty:true,
    errorMessage:'Please insert club number'
  },
  amutaNum: {
    trim: true,
    not:true,
    isEmpty:true,
    errorMessage:'Please insert Amuta number'
  },
  managerName: {
    trim: true,
    not:true,
    isEmpty:true,
    toLowerCase:true,
    errorMessage:'Please insert manager name'
  },
  email: {
    trim:true,
    required:false,
    isEmail:true,
    normalizeEmail:true,
    toLowerCase:true,
    errorMessage:'Please insert a valid email'
  },
  city: {
    trim: true,
    not:true,
    isEmpty:true,
    toLowerCase:true,
    errorMessage:'Please insert city'
  },
  gender: {
  trim:true,
  toLowerCase:true
  },
  city: {
    trim:true,
    toLowerCase:true
    }    
}) ,async (req, res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
    return res.status(400).json({ errors:errors.array() })
    }

    const { clubName,clubNum,amutaNum,managerName,startDateActivity,city,email,phoneNum } = req.body;

    try {
    let club = await Club.findOne({ clubNum });

    if(club) return res.status(400).json({ errors:[{ msg: 'Club already exits' }] });

    club = new Club({
      clubName,
      clubNum,
      amutaNum,
      managerName,
      startDateActivity,
      city,
      email,
      phoneNum
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
  const updates = Object.keys(req.body);
  const allowedUpdates = ['clubName', 'managerName','city'];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update));

  if (!isValidUpdate) return res.status(400).send('error: Invalid updates')
  
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



module.exports = router;