/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, Fragment,useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateTeam } from '../../../actions/teams';


const CreateTeam = ({team:{ loading }, updateTeam, history, teamdata}) => {

  console.log(teamdata)
  
  const [formDate, setFormDate] = useState({
    teamName:'',
    teamCategory:'',
    teamNum:'',
    ligueLevel:'',
    ageCategory:'',
    clubNum:'',
    coachName:'',
    details :''
  });

    
  useEffect (() => {
  setFormDate ({
      teamName:loading || !teamdata.teamName ? '' : teamdata.teamName,
      teamCategory:loading || !teamdata.teamCategory ? '' : teamdata.teamCategory,
      teamNum:loading || !teamdata.teamNum ? '' : teamdata.teamNum,
      ligueLevel:loading || !teamdata.ligueLevel ? '' : teamdata.ligueLevel,
      ageCategory:loading || !teamdata.ageCategory ? '' : teamdata.ageCategory,
      clubNum:loading || !teamdata.clubNum ? '' : teamdata.clubNum,
      coachName:loading || !teamdata.coachName ? '' : teamdata.coachName,
      details:loading || !teamdata.details ? '' : teamdata.details
    });
  } , []);

  const { teamName,
    teamCategory,
    teamNum,
    ligueLevel,
    ageCategory,
    clubNum,
    coachName,
    details
    } = formDate;

  const onChange = e => setFormDate({...formDate, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault()
    updateTeam(formDate,history,true, teamdata._id) 
  }
  
  return ( 
  <Fragment>      
      <small>* = required field</small>
      
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
        </div>
        <div className="form-group">
        <small class="form-text">
        * Team Name
        </small>
          <input type="text" name="teamName" value={teamName} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        * Team Number
        </small>
          <input type="text" name="teamNum" value={teamNum} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        * Team Category
        </small>
          <input type="text" name="teamCategory" value={teamCategory} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        Ligue Level
        </small>
          <input type="text" name="ligueLevel" value={ligueLevel} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        Age Category
        </small>
          <input type="text" name="ageCategory" value={ageCategory} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        Club Number
        </small>
          <input type="text" name="clubNum" value={clubNum} onChange={e =>onChange(e)} />
        </div>
        
        <div className="form-group">
        <small class="form-text">
        Coach Name
        </small>
          <input type="Date"  name="coachName" value={coachName} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        Details
        </small>
          <input type="text" name="details" value={details} onChange={e =>onChange(e)}/>
        </div>

        

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/teams">Go Back</Link>
      </form>
    </Fragment>
  )
}


CreateTeam.propTypes = {
  updateTeam:PropTypes.func.isRequired,
  team:PropTypes.object.isRequired,
  teamdata:PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  team:state.team
})

export default connect(mapStateToProps, { updateTeam })(withRouter(CreateTeam));
