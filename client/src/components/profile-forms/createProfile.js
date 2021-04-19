/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';



const CreateProfile = ({createProfile, history}) => {
  const [formDate, setFormDate] = useState({
    idNumber:'',
    gender:'',
    teamNum:'',
    payment:'',
    dateOfBirth:'',
    sportType:'',
    city:'',
    status :''
  });

  const { idNumber, 
          gender, 
          teamNum,  
          payment, 
          dateOfBirth,  
          sportType, 
          city, 
          status 
        } = formDate;

  const onChange = e => setFormDate({...formDate, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formDate,history)
  }
  
  return ( 
  <Fragment>
      <h5 className="lead text-primary">
        Create Your Profile
      </h5>
      
      <small>* = required field</small>
      
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
        </div>
        <div className="form-group">
          <input type="text" placeholder="* ID number" name="idNumber" value={idNumber} onChange={e =>onChange(e)} />
        </div>
        <div className="form-group">
          <select name="gender" value={gender} onChange={e =>onChange(e)}>
            <option value="0">* Gender</option>
            <option value="1">Female</option>
            <option value="2">Male</option>
          </select>
        </div>
        <div className="form-group">
          <select name="payment" value={payment} onChange={e =>onChange(e)}>
            <option value="0">* Payment</option>
            <option value="1">Paid</option>
            <option value="2">Not paid</option>
          </select>            
        </div>
        <div className="form-group">
          <select name="teamNum" value={teamNum} onChange={e =>onChange(e)}>
            <option value="0">* Team Number</option>
            <option value="1">Paid</option>
            <option value="2">Not paid</option>
          </select>            
        </div>
        <div className="form-group">
        <small class="form-text">
          Birthday
        </small>
          <input type="Date" placeholder="Date of birth" name="dateOfBirth" value={dateOfBirth} onChange={e =>onChange(e)} />
          
        </div>
        <div className="form-group">
          <input type="text" placeholder="Sport Type" name="sportType" value={sportType} onChange={e =>onChange(e)}/>
          
        </div>
        <div className="form-group">
          <input type="text" placeholder="City" name="city" value={city} onChange={e =>onChange(e)}/>
          
        </div>
        <div className="form-group">
          <input type="text" placeholder="Status" name="status" value={status} onChange={e =>onChange(e)}/>
        </div>     
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}


CreateProfile.propTypes = {
createProfile:PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
