/* eslint-disable no-mixed-operators */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chart from './BarChart';

import Spinner from '../layout/spinner';

import moment from 'moment';
import { getAllPlayers, clearPlayer } from '../../actions/players';
import { getAllClubs, clearClub } from '../../actions/clubs';
import { clearTeam, getAllTeams } from '../../actions/teams';


const Dashboard = ({ 
  auth: {user}, 
  club: { clubs, clubLoading }, 
  team: { teams, teamLoading}, 
  player:{ players, playerLoading }, 
  getAllPlayers, 
  clearPlayer,
  getAllClubs, 
  clearClub,
  getAllTeams,
  clearTeam
}) => {


  useEffect(() => {
    clearPlayer();
    clearClub();
    clearTeam();
    getAllPlayers(user.teamNum);
    getAllClubs(user.teamNum);
    getAllTeams(user.teamNum);
  }, []);

const yearNow = moment(Date.now()).format('YYYY');

const malePlayers = players.filter((player)=>player.gender === '1' && yearNow - moment(player.dateOfBirth).format('YYYY') > 18);
const femalePlayers = players.filter((player)=>player.gender === '2' && yearNow - moment(player.dateOfBirth).format('YYYY') > 18);
const boysPlayer = players.filter((player)=> player.gender === '1' && yearNow - moment(player.dateOfBirth).format('YYYY') <= 18);
const girlsPlayer = players.filter((player)=> player.gender === '2' && yearNow - moment(player.dateOfBirth).format('YYYY') <= 18);

const TitleCase = (str) => {
  return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}


  const fields = [
    <tr key={'field'}>
    <td><Link to='/clubs'>{clubs.length}</Link></td>
    <td><Link to='/teams'>{teams.length}</Link></td>
    <td><Link to='/players'>{players.length}</Link></td>
    <td>{malePlayers.length}</td>
    <td>{femalePlayers.length}</td>
    <td>{boysPlayer.length}</td>
    <td>{girlsPlayer.length}</td>
  </tr>
  ]
   


  return  clubLoading || teamLoading || playerLoading ? <Spinner /> :
  <Fragment>
    <h1 className="lead text-primary">Dashboard</h1>
    <p className="lead">
      <i className= 'fas fa-user'></i> Welcome {user && TitleCase(user.firstName)} </p>
    <table>
      <thead>
        <tr key={'1'}>
          <th>Total Clubs</th>
          <th>Total Teams</th>
          <th>Total Players</th>
          <th>Male</th>
          <th>Female</th>
          <th>Boys</th>
          <th>Girls</th>
        </tr>
      </thead>
      <tbody>
      {fields}
      </tbody>
    </table>
    <br></br><br></br>
    <Chart />
  </Fragment>
};

Dashboard.propTypes = {
  getAllPlayers:PropTypes.func.isRequired,
  getAllClubs:PropTypes.func.isRequired,
  clearPlayer:PropTypes.func.isRequired,
  clearClub:PropTypes.func.isRequired,
  clearTeam:PropTypes.func.isRequired,
  getAllTeams:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  player:PropTypes.object.isRequired,
  team:PropTypes.object.isRequired,
  club:PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  player:state.player,
  club:state.club,
  team:state.team
});

export default connect (mapStateToProps,{ getAllPlayers, getAllClubs, clearPlayer, clearClub, clearTeam, getAllTeams })(Dashboard);
