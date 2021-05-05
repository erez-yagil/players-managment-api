/* eslint-disable array-callback-return */
/* eslint-disable no-sequences */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAllTeams, deleteTeam, clearTeam } from '../../actions/teams'
import { connect } from 'react-redux';
import {getAllPlayers} from '../../actions/players';

const TeamInfo = ({ 
  team:{ teams }, 
  auth: { user }, 
  player:{ players }, 
  club: { clubs }, 
  getAllTeams, 
  deleteTeam, 
  clearTeam, 
  getAllPlayers }) => {

  useEffect(() => {
    clearTeam();
    getAllTeams(user.teamNum);
    getAllPlayers(user.teamNum);
  }, []);

  const TitleCase = (str) => {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  const findNumPlayers = (teamNum) => {
     const num = players.filter(player => player.teamNum === teamNum);
     return num.length;
  };

  const findClubName = (clubNum) => {
    let club = clubs.filter(club => club.clubNum === clubNum);
    club = TitleCase(club[0].clubName);
    return club
  }

  


  const body = teams.map( team => (
    <tr key={team._id}>
      <td>{team.teamNum}</td>
      <td><Link to={"/"}>{TitleCase(team.teamName)}</Link></td>
      <td><Link to={"/clubs"}>{findClubName(team.clubNum)}</Link></td>
      <td><Link to={`/players/${team.teamNum}`}>{findNumPlayers(team.teamNum)}</Link></td>
      <td className="button-group">
      <Link to={`/addplayertoteam/${team._id}`} className = 'table-bottons'>Add Player To Team</Link>
      <Link to={`/edit-team/${team._id}`} className = 'table-bottons'>Edit Team</Link>
      <span onClick={()=>deleteTeam(team._id)} className = 'table-bottons'>Delete Team</span>
      </td>
    </tr>
    ))


  return (
    <Fragment>
      <h2>Teams info</h2>
      <Link to={'/add-team'} className='btn btn-light'>Add Team</Link>
      <br></br><br></br>
      <table>
      <thead>
        <tr>
          <th>Team Number</th>
          <th>Team Name</th>
          <th>Club Name</th>
          <th>players</th>
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

TeamInfo.propTypes = {
  deleteTeam:PropTypes.func.isRequired,
  clearTeam:PropTypes.func.isRequired,
  getAllPlayers:PropTypes.func.isRequired,
  getAllTeams:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  player:PropTypes.object.isRequired,
  club:PropTypes.object.isRequired

}

const mapStateToProps = state => ({
  player :state.player,
  team: state.team,
  auth:state.auth,
  club:state.club

});

export default connect( mapStateToProps , {deleteTeam, clearTeam, getAllPlayers, getAllTeams} )(TeamInfo);