/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllClubs, deleteClub } from '../../actions/clubs'
import { connect } from 'react-redux';
import {AddClubForm, EditClubForm} from './ClubActions';

const ClubInfo = ({ club:{ clubs }, getAllClubs, deleteClub }) => {

  useEffect(() => {
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
          <EditClubForm clubid={club._id}/>
          <button onClick={()=>deleteClub(club._id)}>Delete</button>
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
  deleteClub:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile :state.profile,
  club: state.club
});

export default connect( mapStateToProps , {getAllClubs, deleteClub} )(ClubInfo);