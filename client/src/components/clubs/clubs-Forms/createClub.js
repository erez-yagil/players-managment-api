/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createClub, getCurrentClub } from '../../../actions/clubs';


const CreateClub = ({createClub, history}) => {

  getCurrentClub('608450f29caabd5b0c58d82f');
  
  const [formDate, setFormDate] = useState({
    clubName:'',
    clubNum:'',
    amutaNum:'',
    presidentName:'',
    ceoName:'',
    startDateActivity:'',
    city:'',
    email :'',
    phoneNum:'',
    website:''
  });


  const { clubName,
          clubNum,
          amutaNum,
          presidentName,
          ceoName,
          startDateActivity,
          city,
          email,
          phoneNum,
          website
        } = formDate;

  const onChange = e => setFormDate({...formDate, [e.target.name]: e.target.value});
  
  const onSubmit = e => {
    e.preventDefault()
    createClub(formDate,history) 
  }
  
  return ( 
  <Fragment>      
      <small>* = required field</small>
      
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
        </div>
        <div className="form-group">
        <small class="form-text">
        * Club Name
        </small>
          <input type="text" name="clubName" value={clubName} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        * Club Number
        </small>
          <input type="text" name="clubNum" value={clubNum} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        Amuta Number
        </small>
          <input type="text" name="amutaNum" value={amutaNum} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        President Name
        </small>
          <input type="text" name="presidentName" value={presidentName} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        CEO Name
        </small>
          <input type="text" name="ceoName" value={ceoName} onChange={e =>onChange(e)} />
        </div>
        
        <div className="form-group">
        <small class="form-text">
        Start Date Activity
        </small>
          <input type="Date"  name="startDateActivity" value={startDateActivity} onChange={e =>onChange(e)} />
        </div>

        <div className="form-group">
        <small class="form-text">
        City
        </small>
          <input type="text" name="city" value={city} onChange={e =>onChange(e)}/>
        </div>

        <div className="form-group">
        <small class="form-text">
        Email
        </small>
          <input type="text" name="email" value={email} onChange={e =>onChange(e)}/>
        </div>

        <div className="form-group">
        <small class="form-text">
        Phone Number
        </small>
          <input type="text" name="phoneNum" value={phoneNum} onChange={e =>onChange(e)}/>
        </div>  

        <div className="form-group">
        <small class="form-text">
        Website
        </small>
          <input type="text" name="website" value={website} onChange={e =>onChange(e)}/>  
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/clubs">Go Back</Link>
      </form>
    </Fragment>
  )
}


CreateClub.propTypes = {
  createClub:PropTypes.func.isRequired,
  club:PropTypes.object.isRequired};

const mapStateToProps = state =>({
  club:state.club
})

export default connect(mapStateToProps, { createClub })(withRouter(CreateClub));
