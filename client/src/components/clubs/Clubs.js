/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAllClubs, deleteClub, clearClub } from '../../actions/clubs'
import {getAllTeams} from '../../actions/teams';
import {getAllPlayers} from '../../actions/players';
import { connect } from 'react-redux';

const ClubInfo = ({ 
  club:{ clubs }, 
  getAllClubs, 
  deleteClub, 
  getAllTeams, 
  getAllPlayers, 
  auth: { user }, 
  team:{ teams }, 
  player: { players } 
}) => {

  useEffect(() => {
    
    getAllClubs(user.teamNum);
    getAllPlayers(user.teamNum);
    getAllTeams(user.teamNum);
  }, []);

  const TitleCase = (str) => {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }


  const body = clubs.map( club => (
          
    <tr key={club._id}>
      <td>{club.clubNum}</td>
      <td>{TitleCase(club.clubName)}</td>
      <td><Link to="/teams">{teams.length}</Link></td>
      <td><Link to="/players">{players.length}</Link></td>
      <td className="button-group">
      <Link to={`/addteamtoclub/${club._id}`} className="table-bottons">Add team to club</Link>
      <Link to={`/edit-club/${club._id}`} className="table-bottons">Edit club</Link>
      <span onClick={()=>deleteClub(club._id)} className="table-bottons">Delete club</span>
      </td>
    </tr>
    ))

   return (
    <Fragment>
      <h2>Clubs info</h2>
      <Link to={'/add-club'} className="btn btn-light">Add Club</Link>
      <br></br> <br></br>
    <table>
      <thead>
        <tr>
          <th>Club Number</th>
          <th>Club Name</th>
          <th>Teams</th>
          <th>Players</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {body}
    </tbody>
    </table>
    </Fragment>
  )
}

ClubInfo.propTypes = {
  getAllClubs:PropTypes.func.isRequired,
  clearClub:PropTypes.func.isRequired,
  deleteClub:PropTypes.func.isRequired,
  getAllPlayers:PropTypes.func.isRequired,
  getAllTeams:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  team:PropTypes.object.isRequired,
  player:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  club: state.club,
  auth:state.auth,
  team:state.team,
  player:state.player
});

export default connect( mapStateToProps , { getAllClubs, deleteClub, clearClub, getAllPlayers, getAllTeams} )(ClubInfo);