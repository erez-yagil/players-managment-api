/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllClubs, deleteClub, clearClub } from '../../actions/clubs'
import { connect } from 'react-redux';
import {AddClubForm, EditClubForm, AddTeamToClub} from './ClubActions';

const ClubInfo = ({ club:{ clubs }, getAllClubs, deleteClub, clearClub, auth: { user } }) => {

  useEffect(() => {
    clearClub();
    getAllClubs();
  }, []);

 


  return (
    <Fragment>
      <h2>Clubs info</h2>
        <AddClubForm />
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
      <tbody>
        {clubs.map( club => (
          
        <tr key={club._id}>
          <td>{club.clubName}</td>
          <td>{club.clubNum}</td>
          <td>{club._id}</td>
          <td></td>
          <td>
          <EditClubForm clubid={club._id} />
          <AddTeamToClub clubid={club._id} />
          <button onClick={()=>deleteClub(club._id)} className='btn btn-light'>Delete</button>
          </td>
        </tr>
        ))}
    </tbody>
    </table>
    </Fragment>
  )
}

ClubInfo.propTypes = {
  getAllClubs:PropTypes.func.isRequired,
  clearClub:PropTypes.func.isRequired,
  deleteClub:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile :state.profile,
  club: state.club,
  auth:state.auth
});

export default connect( mapStateToProps , {getAllClubs, deleteClub, clearClub} )(ClubInfo);