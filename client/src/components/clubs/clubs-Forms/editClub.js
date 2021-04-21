/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, Fragment,useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateClub } from '../../../actions/clubs';


const CreateClub = ({club:{ loading }, updateClub, history, clubdata}) => {
  
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

    
  useEffect (() => {
  setFormDate ({
      clubName:loading || !clubdata.clubName ? '' : clubdata.clubName,
      clubNum:loading || !clubdata.clubNum ? '' : clubdata.clubNum,
      amutaNum:loading || !clubdata.amutaNum ? '' : clubdata.amutaNum,
      presidentName:loading || !clubdata.presidentName ? '' : clubdata.presidentName,
      ceoName:loading || !clubdata.ceoName ? '' : clubdata.ceoName,
      startDateActivity:loading || !clubdata.startDateActivity ? '' : clubdata.startDateActivity,
      city:loading || !clubdata.city ? '' : clubdata.city,
      email:loading || !clubdata.email ? '' : clubdata.email,
      phoneNum:loading || !clubdata.phoneNum ? '' : clubdata.phoneNum,
      website:loading || !clubdata.website ? '' : clubdata.website
    });
} , []);

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
    updateClub(formDate,history,true, clubdata._id) 
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
  updateClub:PropTypes.func.isRequired,
  club:PropTypes.object.isRequired,
  clubdata:PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  club:state.club
})

export default connect(mapStateToProps, { updateClub })(withRouter(CreateClub));
