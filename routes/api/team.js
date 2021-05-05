const express = require('express');
const router = express.Router();
const { checkSchema , validationResult } = require('express-validator');
const Team = require('../../modules/Team');
const auth = require('../../middleware/auth');

// Add Team

router.post('/',
checkSchema({
  teamName: {
    trim: true,
    not:true,
    isEmpty:true,
    toLowerCase:true,
    errorMessage:'Please insert team name'
  },
  teamCategory: {
    trim: true,
    not:true,
    isEmpty:true,
    errorMessage:'Please insert team category'
  },
  teamNum: {
    trim: true,
    not:true,
    isEmpty:true,
    errorMessage:'Please insert team number'
  },
  ligueLevel: {
    trim: true,
    not:true,
    isEmpty:true,
    errorMessage:'Please insert lige level'
  },
  ageCategory: {
    trim: true,
    not:true,
    isEmpty:true,
    errorMessage:'Please insert age category'
  },  
  clubNum: {
    trim: true,
    not:true,
    isEmpty:true,
    errorMessage:'Please insert club number'
  },  
  coachName: {
    trim: true,
    toLowerCase:true,
    errorMessage:'Please insert coach name'
  }, 
  details: {
    trim: true,
    toLowerCase:true,
    errorMessage:'Please insert valid details'
  }  
})
  ,async (req, res)=> {
    const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors:errors.array() })
  }

  const { teamName,
          teamCategory,
          teamNum,
          ligueLevel,
          ageCategory,
          clubNum,
          coachName,
          details 
        } = req.body;

  try {
    let team = await Team.findOne({ teamNum });

    if(team) return res.status(400).json({ errors:[{ msg: 'Team already exits' }] });

    team = new Team({
          teamName,
          teamCategory,
          teamNum,
          ligueLevel,
          ageCategory,
          clubNum,
          coachName,
          details 
        })

    await team.save();
    res.send(team)

  } catch (error){
    console.error(error);
    return res.status(500).send('Server error')
  }
})


// Update Team by id //

router.patch('/:id', async (req, res)=>{
  
  try{
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
       new:true,
       runValidators:true
    });

    if(!team) return res.status(400).send('No team found');

    res.send(team);


  } catch (error){
    console.error(error);

    if (error.kind == 'ObjectId') return res.status(400).send('No team found');
    return res.status(500).send('Server error')
  }
})


// Delete Team by id //

router.delete('/:id', async (req, res)=>{
  
  try{
    const team = await Team.findByIdAndRemove(req.params.id);

    if(!team) return res.status(400).send('No team found');

    res.send(`User ${team.teamName}  deleted`);

  } catch (error){
    console.error(error);

    if (error.kind == 'ObjectId') return res.status(400).send('No team found');
    
    return res.status(500).send('Server error')
  }
})


// Get All Teams //

router.get('/', async (req, res)=> {
  try {
    const teams = await Team.find();
    
    if (!teams) {
      return res.status(400).json({ msg: 'There is no team' })
    }

    res.json(teams);

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
});

// Get All Teams By Club Number //

router.get('/club/:clubNum', async (req, res)=> {
  try {
    const teams = await Team.find({clubNum:req.params.clubNum});
    
    if (!teams) {
      return res.status(400).json({ msg: 'There is no team' })
    }

    res.json(teams);

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
});


// Get my Team //

router.get('/me/:teamNum', async (req, res)=> {
  try {
    const team = await Team.findOne({teamNum:req.params.teamNum});
    
    if (!team) {
      return res.status(400).json({ msg: 'There is no teams' })
    }

    res.json(team);

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})

// Get Team By Id //

router.get('/:id', async (req, res)=> {
  try {
    const team = await Team.findOne({_id: req.params.id});
    
    if (!team) {
      return res.status(400).json({ msg: 'There is no teams' })
    }

    res.json(team);

  } catch(error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})



module.exports = router;