/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';

import { getAllPlayers, deletePlayer, clearPlayer, getAllPlayersByTeam } from '../../actions/players'
import { getAllClubs } from '../../actions/clubs';
import {getAllTeams} from '../../actions/teams';
import Spinner from '../layout/spinner';




const UserInfo = ({
  player: { players, playerLoading, playersByTeam },
  team:{ teams }, 
  auth: { user },
  match, 
  getAllClubs, 
  getAllPlayers, 
  deletePlayer, 
  clearPlayer, 
  getAllTeams,
  getAllPlayersByTeam
}) => {

useEffect(() => {
  clearPlayer();
  if(match.params.teamNum){
    getAllPlayersByTeam(match.params.teamNum)
  };
  getAllClubs(user.teamNum);
  getAllPlayers(user.teamNum);
  getAllTeams(user.teamNum);
  },[]);
  
  let showByTeam = '';
  if (match.params.teamNum) {
    showByTeam = true;
  }

  const TitleCase = (str) => {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  let playersArray = players.filter((player)=>player.accessLevel === 1);
  if(showByTeam){
    playersArray = playersByTeam.filter((player)=>player.accessLevel === 1);
  }


  const findTeamName = (teamNum) => {
    let team = teams.filter(team => team.teamNum === teamNum);
    // if team.length === 0
      if(!team.length){
        return 'Undefined'
      } else {
       return TitleCase(team[0].teamName);
      }
    };

  
  const users = playersArray.map( player => {

    return (
    <tr key={player._id}>
      <td><Link to={`/player/${player._id}`}>{TitleCase(player.firstName)}</Link></td>
      <td>{TitleCase(player.lastName)}</td>
      <td>{findTeamName(player.teamNum)}</td>
      <td>{player.idNumber}</td>
      <td>{moment(player.dateOfBirth).format('YYYY')}</td>
      <td>{player.gender === '1' ? "Male": "Female" }</td>
      <td className="button-group">
        <Link to={`/edit-player/${player._id}`} className = 'table-bottons'>Edit Player</Link>
        <span onClick={() => deletePlayer(player._id)} className = 'table-bottons'>Delete User</span>
      </td>
    </tr>  
   )});  
  
  return playerLoading ? <Spinner /> :
  (
    <Fragment>
    <h2>Players info</h2>
    <Link to={'/add-player'} className="btn btn-light">Add Player</Link>
    <br></br><br></br>

    <table>
      <thead>
        <tr>
          <th>First name</th>
          <th>Last Name</th>
          <th>Team name</th>
          <th>ID Number</th>
          <th>Year Of Birth</th>
          <th>Gender</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{users}</tbody>
    </table>
    </Fragment>
  )
}

UserInfo.propTypes = {
  deletePlayer:PropTypes.func.isRequired,
  getAllPlayers:PropTypes.func.isRequired,
  clearPlayer:PropTypes.func.isRequired,
  getAllClubs:PropTypes.func.isRequired,
  getAllPlayersByTeam:PropTypes.func.isRequired,
  getAllTeams:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  team:PropTypes.object.isRequired,
  player:PropTypes.object.isRequired  

}

const mapStateToProps = state => ({
  player: state.player,
  auth:state.auth,
  team :state.team,
});

export default connect( mapStateToProps , {deletePlayer, getAllPlayers, clearPlayer, getAllClubs, getAllPlayersByTeam, getAllTeams} )(UserInfo);