/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllClubs, deleteClub } from '../../actions/clubs'
import { connect } from 'react-redux';
import {AddClubForm} from './ClubActions';




const UserInfo = ({profile: { profiles, loading }, club:{ clubs }, getAllClubs, deleteClub }) => {


useEffect(() => {
  getAllClubs();
}, []);

  const fields = clubs.map( club => (
    <tr key={club._id}>
     <td>{club.clubName}</td>
     <td>{club.clubNum}</td>
     <td></td>
     <td></td>
     <td><button>Edit</button><button onClick={()=>deleteClub(club._id)}>Delete</button></td>
     

    </tr>  
   ));
  
  return (
    <Fragment>
      <h2>Clubs info</h2>
      <Fragment>
        <AddClubForm />
      </Fragment>
      <br></br>
    

    <table className="table">
      <thead>
        <tr>
          <th>Club Name</th>
          <th>Club Number</th>
          <th>Teams</th>
          <th>players</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{fields}</tbody>
    </table>
    </Fragment>
  )
    
    
}

UserInfo.propTypes = {
  getAllClubs:PropTypes.func.isRequired,
  deleteClub:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile :state.profile,
  club: state.club
});

export default connect( mapStateToProps , {getAllClubs, deleteClub} )(UserInfo);