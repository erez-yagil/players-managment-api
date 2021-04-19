/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllProfiles, deleteUser } from '../../actions/profile'
import { connect } from 'react-redux';
import moment from 'moment';



const UserInfo = ({profile: { profiles, loading },getAllProfiles, deleteUser }) => {


useEffect(() => {
  getAllProfiles();
  }, []);

  const users = profiles.map( profile => (
    <tr key={profile._id}>
      <td>{profile.user.firstName.charAt(0).toUpperCase() + profile.user.firstName.slice(1)}</td>
      <td>{profile.user.lastName.charAt(0).toUpperCase() + profile.user.lastName.slice(1)}</td>
      <td>{profile.teamNum}</td>
      <td>{profile.idNumber}</td>
      <td>{moment(profile.dateOfBirth).format('YYYY')}</td>
      <td>{profile.gender}</td>
      <td>{profile.payment}</td>

      <td><button onClick={() => deleteUser(profile.user._id)}>Delete User</button></td>
    </tr>  
   ));
  
  return (
    <Fragment>
    <h2>Users info</h2>
    <table className="table">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last Name</th>
          <th>Team name</th>
          <th>ID Number</th>
          <th>Year Of Birth</th>
          <th>Gender</th>
          <th>Matches</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>{users}</tbody>
    </table>
    </Fragment>
  )
    
    
}

UserInfo.propTypes = {
  deleteUser:PropTypes.func.isRequired,
  getAllProfiles:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile :state.profile
});

export default connect( mapStateToProps , {deleteUser, getAllProfiles} )(UserInfo);