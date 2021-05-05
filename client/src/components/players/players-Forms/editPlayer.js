/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser, updatePlayer } from '../../../actions/players';
import Spinner from '../../layout/spinner';


const CreatePlayer = ({ 
  updatePlayer,
  history, 
  team:{ teams, teamLoading }, 
  club: { clubs },
  playerData
}) => {


  const [formDate, setFormDate] = useState({
    firstName:'',
    lastName:'',
    idNumber:'',
    accessLevel:'',
    password:'',
    gender:'',
    clubNum:'',
    teamNum:'',
    payment:'',
    dateOfBirth:'',
    city:'',
    email:'',
    status:'',
    details:'',
    file:''
  });

  useEffect (() => {
    
    setFormDate ({
        firstName:teamLoading || !playerData.firstName ? '' : playerData.firstName,
        lastName:teamLoading || !playerData.lastName ? '' : playerData.lastName,
        idNumber:teamLoading || !playerData.idNumber ? '' : playerData.idNumber,
        accessLevel:teamLoading || !playerData.accessLevel ? '' : playerData.accessLevel,
        password:teamLoading || !playerData.password ? '' : playerData.password,
        gender:teamLoading || !playerData.gender ? '' : playerData.gender,
        clubNum:teamLoading || !playerData.clubNum ? '' : playerData.clubNum,
        teamNum:teamLoading || !playerData.teamNum ? '' : playerData.teamNum,
        payment:teamLoading || !playerData.payment ? '' : playerData.payment,
        dateOfBirth:teamLoading || !playerData.dateOfBirth ? '' : playerData.dateOfBirth,
        city:teamLoading || !playerData.city ? '' : playerData.city,
        email:teamLoading || !playerData.email ? '' : playerData.email,
        status:teamLoading || !playerData.status ? '' : playerData.status,
        details:teamLoading || !playerData.details ? '' : playerData.details

      });
    } , []);

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
          details,
          file
        } = formDate;

  const onChange = e => setFormDate({...formDate, [e.target.name]: e.target.value});
  
  const onSubmit = e => {
    e.preventDefault()
    if (formDate.gender == 0){
      return alert('Please choose Gender')
    } else if (formDate.payment == 0) {
      return alert('Please choose Payment')
    } 
    else if (formDate.status == 0) {
      return alert('Please choose Status')
    } 

    updatePlayer(formDate, history, true, playerData._id );
  }
  
  return teamLoading ? <Spinner /> :
  ( 
  <Fragment>      
      <small>* = required field</small>
      <br></br>  <br></br>
      <form className="form" onSubmit={e => onSubmit(e)}>
      <div className="grid">
        <div className="grid-column grid-1">
        <h3>Personal Info</h3>
          <div className="form-group">
          </div>
          <div className="form-group">
            <small class="form-text">
            * First Name
            </small>
              <input type="text" name="firstName" value={firstName} onChange={e =>onChange(e)} />
          </div>

          <div className="form-group">
            <small class="form-text">
            * Last Name
            </small>
              <input type="text" name="lastName" value={lastName} onChange={e =>onChange(e)} />
          </div>

          <div className="form-group">
            <small class="form-text">
            * Id Number
            </small>
            <input type="text" name="idNumber" value={idNumber} onChange={e =>onChange(e)} />
          </div>

        <div class="form-group">
          <select name="gender" value={gender} onChange={e =>onChange(e)}>
            <option value="0">* Select Gender</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
          </select>
        </div>

        <div className="form-group">
          <small class="form-text">
          Date Of Birth
          </small>
            <input type="date" name="dateOfBirth" value={dateOfBirth} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
          <small class="form-text">
          City
          </small>
            <input type="text" name="city" value={city} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
          <small class="form-text">
          Email
          </small>
            <input type="text" name="email" value={email} onChange={e =>onChange(e)} />
        </div>
      </div>
     
        

       
      <div className="grid-column grid-2">
        <h3>Team Info</h3>
        <div className="form-group">
          <small class="form-text">
          * Access Level
          </small>
            <input type="text" name="accessLevel" value={accessLevel} onChange={e =>onChange(e)} />
          </div>
      
          <div className="form-group">
              <select name="clubNum" value={clubNum} onChange={e =>onChange(e)}>
              <option value="0">Select</option>
                {clubs.map(club => 
                <option value={club.clubNum}>{club.clubName}</option>
                )}
              </select>
              </div>
                  
              <div class="form-group">
              <select name="teamNum" value={teamNum} onChange={e =>onChange(e)}>
              <option value="0">Select</option>
              {teams.map((team)=> 
                <option value={team.teamNum}>{team.teamName}</option>)}
              </select>
            </div>

          <div class="form-group">
            <select name="payment" value={payment} onChange={e =>onChange(e)}>
              <option value="0">* Select Payment</option>
              <option value="1">Paid</option>
              <option value="2">Not paid</option>
            </select>
          </div>

          <div class="form-group">
            <select name="status" value={status} onChange={e =>onChange(e)}>
              <option value="0">* Select Status Player</option>
              <option value="1">Active</option>
              <option value="2">Not Active</option>
            </select>
          </div>

          <div className="form-group">
            <small className="form-text">
            Details:
            </small>
            <textarea rows="4" name="details" value={details}  onChange={e =>onChange(e)} />
            </div>

            

        </div>
      </div>
          <div className="text-center">
            <input type="submit" value="Continue" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/clubs">Go Back</Link>
        </div>
      </form>

    </Fragment>
  )
}


CreatePlayer.propTypes = {
  createUser:PropTypes.func.isRequired,
  updatePlayer:PropTypes.func.isRequired,
  team:PropTypes.object.isRequired,
  club:PropTypes.object.isRequired

};

const mapStateToProps = state =>({
  team:state.team,
  club:state.club
})

export default connect(mapStateToProps, { createUser, updatePlayer })(withRouter(CreatePlayer));
