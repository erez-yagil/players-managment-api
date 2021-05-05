/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState ,useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTeam } from '../../../actions/teams';
import {getCurrentClub} from '../../../actions/clubs';



const CreateTeam = ({createTeam, history, toClub , club:{ club } }) => {

  let currentClub = ''

  if (toClub){
    currentClub = club.clubNum;
  } 
  

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


  const { teamName,
          teamCategory,
          teamNum,
          ligueLevel,
          ageCategory,
          clubNum,
          coachName,
          details
        } = formDate;

  const onChange = e => setFormDate({...formDate,clubNum:currentClub, [e.target.name]: e.target.value});
  
  const onSubmit = e => {
    e.preventDefault()
    createTeam(formDate,history) 
  }

  
  return ( 
  <Fragment>      
      <small>* = required field</small>
      
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
        </div>
        <div className="form-group">
        <small className="form-text">
        * Team Name
        </small>
          <input type="text" name="teamName" value={teamName} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small className="form-text">
        * Team Number
        </small>
          <input type="text" name="teamNum" value={teamNum} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <select name="teamCategory" value={teamCategory} onChange={e =>onChange(e)}>
                <option>* Select Team Category</option>
                <option value="1">Men</option>
                <option value="2">Women</option>
                <option value="3">Boys</option>
                <option value="4">Girls</option>
        </select>
        </div>

        

        <div className="form-group">
        <small className="form-text">
        * Ligue Level
        </small>
          <input type="text" name="ligueLevel" value={ligueLevel} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small className="form-text">
        * Age Category
        </small>
          <input type="text" name="ageCategory" value={ageCategory} onChange={e =>onChange(e)} />
        </div>
        
        {toClub ?
        <div className="form-group">
        <small className="form-text">
        * Club Number
        </small>
          <input type="text" name="clubNum" value={currentClub} disabled readOnly={true}/>
        </div>
         :
      
        <div className="form-group">
        <small className="form-text">
        * Club Number
        </small>
          <input type="text" name="clubNum" value={clubNum} onChange={e =>onChange(e)} />
        </div>
        }
        
        <div className="form-group">
        <small className="form-text">
        Coach Name
        </small>
          <input type="text"  name="coachName" value={coachName} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small className="form-text">
        Details
        </small>
          <input type="text" name="details" value={details} onChange={e =>onChange(e)}/>
        </div>

        

        <input type="submit" className="btn btn-primary my-1" value="Create team" />
        <Link className="btn btn-light my-1" to="/teams">Go Back</Link>
      </form>
    </Fragment>
  )
}


CreateTeam.propTypes = {
  createTeam:PropTypes.func.isRequired,
  getCurrentClub:PropTypes.func.isRequired,
  team:PropTypes.object.isRequired,
  club:PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  team:state.team,
  club:state.club
})

export default connect(mapStateToProps, { createTeam, getCurrentClub })(withRouter(CreateTeam));
