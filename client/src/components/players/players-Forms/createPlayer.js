/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser } from '../../../actions/players';
import Spinner from '../../layout/spinner';
import UploadFile from '../../layout/UploadFile';
import Select from 'react-select';


const CreatePlayer = ({ 
  createUser, 
  match, 
  team:{ team, teamLoading, teams}, 
  club: { clubs },
}) => {

  const teamId = match.params.id;

  let currentTeam = '';
  let currentClub = '';

  if (teamId){
  currentTeam = team.teamNum;
  currentClub = team.clubNum;
  };
 
  
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    idNumber:'',
    accessLevel:'',
    password:'',
    gender:'',
    clubNum:currentClub,
    teamNum:currentTeam,
    payment:'',
    dateOfBirth:'',
    city:'',
    email:'',
    status:'',
    medicalTest:'',
    details:'',
    file:''
  });


  const { firstName,
          lastName,
          idNumber,
          accessLevel,
          password,
          gender,
          teamNum,
          clubNum,
          payment,
          dateOfBirth,
          city,
          email,
          status,
          medicalTest,
          details,
          file
        } = formData;


        let onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

        if (teamId){
            onChange = e => setFormData({...formData,clubNum:currentClub, teamNum:currentTeam, [e.target.name]: e.target.value});
        };
             
  
  const onSubmit = e => {
    e.preventDefault()
    createUser(formData);
  }

  const TitleCase = (str) => {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  const findTeamName = (teamNum) => {
    let team = teams.filter(team => team.teamNum === teamNum);
    // if team.length === 0
      if(!team.length){
        return 'Undefined'
      } else {
       return TitleCase(team[0].teamName);
      }
    };

    const findClubName = (clubNum) => {
      let club = clubs.filter(team => team.clubNum === clubNum);
      // if team.length === 0
        if(!club.length){
          return 'Undefined'
        } else {
         return TitleCase(club[0].clubName);
        }
      };
  
      const ClubOption = (props) =>{
       
        return (
          <option value="2">{props.clubName}</option>  
        )
      };      
      

      const TeamOption = (props) =>{
        return (
        <option value="2">{props.teamName}</option>     
    )};


  return team && teamLoading === null ? <Spinner /> :
  ( 
  <Fragment>      
      <small>* = required field</small>
      <br></br>  <br></br>
      <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="grid">
            <div className="grid-column grid-1">
              <h3>Personal Info</h3>
            <div className="form-group">
            <small className="form-text">
            * First Name
            </small>
              <input type="text" name="firstName" value={firstName} onChange={e =>onChange(e)} />
            </div>

            <div className="form-group">
            <small className="form-text">
            * Last Name
            </small>
              <input type="text" name="lastName" value={lastName} onChange={e =>onChange(e)} />
            </div>

            <div className="form-group">
            <small className="form-text">
            * Id Number
            </small>
              <input type="text" name="idNumber" value={idNumber} onChange={e =>onChange(e)} />
            </div>

            <div class="form-group">
              <select name="gender" value={gender} onChange={e =>onChange(e)}>
                <option>* Select Gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </div>

            <div className="form-group">
            <small className="form-text">
            * password
            </small>
              <input type="password" name="password" value={password} onChange={e =>onChange(e)} />
            </div>

            <div className="form-group">
            <small className="form-text">
            Date Of Birth
            </small>
              <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={e =>onChange(e)} />
            </div>

            <div className="form-group">
            <small className="form-text">
            City
            </small>
              <input type="text" name="city" value={city} onChange={e =>onChange(e)} />
            </div>

            <div className="form-group">
            <small className="form-text">
            Email
            </small>
              <input type="text" name="email" value={email} onChange={e =>onChange(e)} />
            </div>
            </div>
          
            <div className="grid-column grid-2">
            <h3>Team Info</h3>
            <div className="form-group">
            <select name="accessLevel" value={accessLevel} onChange={e =>onChange(e)}>
                <option>* Select Access Level</option>
                <option value="1">Player</option>
                <option value="5">Club Manger</option>
            </select>
            </div>

            

            {teamId ?
            <Fragment>
            <div className="form-group">
            <small className="form-text">
            * Club Name
            </small>
            <select name="clubNum" className="disabled" value={currentClub}>
              <option>{findClubName(currentClub)}</option>
            </select>
            </div>
            
            <div class="form-group">
              <small className="form-text">
              * Team Name
              </small>
              <select name="teamNum" className="disabled" value={currentTeam}>
              <option >{findTeamName(currentTeam)}</option>
            </select>
            </div>
            </Fragment>
            :
            <Fragment>
           
              <div className="form-group">
                <small className="form-text">
                club Number:
                </small>
                <input type="text" name="clubNum" value={clubNum}  onChange={e =>onChange(e)} />
              </div>
                  <small className="form-text">
                Team Number:
                </small>
                <input type="text" name="teamNum" value={teamNum}  onChange={e =>onChange(e)} />
              <div className="form-group">
              
              </div>

            </Fragment>
            }

            
            <div class="form-group">
              <select name="payment" value={payment} onChange={e =>onChange(e)}>
                <option>* Select Payment</option>
                <option value="1">Paid</option>
                <option value="2">Not paid</option>
              </select>
            </div>

            <div className="form-group">
              <select name="status" value={status} onChange={e =>onChange(e)}>
                <option >* Select Status Player</option>
                <option value="1">Active</option>
                <option value="2">Not Active</option>
              </select>
            </div>

            <div className="form-group">
              <select name="medicalTest" value={medicalTest} onChange={e =>onChange(e)}>
                <option value="0" >* Medical Test</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </select>
            </div>

            <div className="form-group">
            <small className="form-text">
            Details:
            </small>
            <textarea rows="4" name="details" value={details}  onChange={e =>onChange(e)} />
            </div>
           
            



        <div className="text-center">
          <input type="submit" value="Continue" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/players">Go Back</Link>
        </div>
      </div>
      </div>
      </form>
      <UploadFile playerIdNumber={idNumber}/>
    </Fragment>
  )
}


CreatePlayer.propTypes = {
  createUser:PropTypes.func.isRequired,
  team:PropTypes.object.isRequired,
  match:PropTypes.object.isRequired,
  club:PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  team:state.team,
  club:state.club
})

export default connect(mapStateToProps, { createUser })(withRouter(CreatePlayer));
