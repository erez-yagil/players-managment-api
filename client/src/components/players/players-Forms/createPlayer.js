/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUser } from '../../../actions/players';
import Spinner from '../../layout/spinner';


const CreatePlayer = ({createUser, toTeam, team:{ team, loading }}) => {

  let currentTeam = '';

  if (toTeam){
  currentTeam = team.teamNum;
  };
 
  
  const [formDate, setFormDate] = useState({
    firstName:'',
    lastName:'',
    idNumber:'',
    accessLevel:'',
    password:'',
    gender:'',
    teamNum:'',
    payment:'',
    dateOfBirth:'',
    city:'',
    email:'',
    status:'',
  });


  const { firstName,
          lastName,
          idNumber,
          accessLevel,
          password,
          gender,
          teamNum,
          payment,
          dateOfBirth,
          city,
          email,
          status,
        } = formDate;

  const onChange = e => setFormDate({...formDate,teamNum:currentTeam, [e.target.name]: e.target.value});
  
  const onSubmit = e => {
    e.preventDefault()
    createUser(formDate);
  }
  
  return team && loading === null ? <Spinner /> :
  ( 
  <Fragment>      
      <small>* = required field</small>
      
      <form className="form" onSubmit={e => onSubmit(e)}>
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

        <div className="form-group">
        <small class="form-text">
        * password
        </small>
          <input type="password" name="password" value={password} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        * Access Level
        </small>
          <input type="text" name="accessLevel" value={accessLevel} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        * Gender
        </small>
          <input type="text" name="gender" value={gender} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        * Team Number
        </small>
          <input type="text" name="teamNum" value={currentTeam} disabled onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
         Payment
        </small>
          <input type="text" name="payment" value={payment} onChange={e =>onChange(e)} />
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

        <div className="form-group">
        <small class="form-text">
         Status
        </small>
          <input type="text" name="status" value={status} onChange={e =>onChange(e)} />
        </div>

        <input type="submit" value="Continue" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/clubs">Go Back</Link>
      </form>
    </Fragment>
  )
}


CreatePlayer.propTypes = {
  createUser:PropTypes.func.isRequired,
  team:PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  team:state.team
})

export default connect(mapStateToProps, { createUser })(withRouter(CreatePlayer));
