const express = require('express');
const router = express.Router();
const { checkSchema , validationResult } = require('express-validator');
const Team = require('../../modules/Team');

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
  coachName: {
    trim: true,
    not:true,
    isEmpty:true,
    toLowerCase:true,
    errorMessage:'Please insert team name'
  },   
})
  ,async (req, res)=> {
    const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors:errors.array() })
  }

  const { teamName,teamCategory,teamNum,ligueLevel,ageCategory,clubNum,coachName } = req.body;
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
      coachName
    })

    await team.save();
    res.send('Team added')


  } catch (error){
    console.error(error);
    res.status(500).send('Server error')
  }
})


// Update Team by id //

router.patch('/:id', async (req, res)=>{
  const updates = Object.keys(req.body);
  const allowedUpdates = ['teamName', 'teamCategory', 'ligueLevel'];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update));

  if (!isValidUpdate) return res.status(400).send('error: Invalid updates')
  
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
    res.status(500).send('Server error')
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


module.exports = router;