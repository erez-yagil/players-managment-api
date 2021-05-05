/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';
import Spinner from '../layout/spinner';

import {getCurrentPlayer, clearPlayer, getAllPlayers, deletePlayer } from '../../actions/players';

const PlayerProfile = ({ 
  getCurrentPlayer,
  clearPlayer,
  deletePlayer,
  match,
  player: { player, playerLoading },
  club: { clubs },
  team: { teams }
}) => {

  useEffect(() => {
    clearPlayer();
    getCurrentPlayer(match.params.id);
    },[]);
  
  const TitleCase = (str) => {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
  }

  const findClubName = (clubNum) => {
    let club = clubs.filter(team => team.clubNum === clubNum);
      if(!club.length){
        return 'Undefined'
      } else {
       return TitleCase(club[0].clubName);
      }
    };
  const findTeamName = (teamNum) => {
    let team = teams.filter(team => team.teamNum === teamNum);
      if(!team.length){
        return 'Undefined'
      } else {
       return TitleCase(team[0].teamName);
      }
    };



  return  player === null || playerLoading ? <Spinner /> : 
    (
    <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
          <h1 className="large">{TitleCase(player.firstName.toString())} {TitleCase(player.lastName.toString())}</h1>
          <p className="lead">Team: {findTeamName(player.teamNum)}</p>
          <p>Club: {findClubName(player.clubNum)}</p>
          <div className="text-right">
          <Link to={`/edit-player/${player._id}`} className="btn btn-light my-1">Edit player info</Link>
          <button onClick={()=> deletePlayer(player._id)} className="btn btn-light my-1s">Delete player</button>
          </div>
          
        </div>

        <div className="profile-info">
          <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Personal Info</h2>
            <div>
              <p><strong>Id Number:</strong> {player.idNumber}</p>
              <p><strong>Email:</strong> {player.email}</p>
              <p><strong>Gender:</strong> {player.gender==='1'? "Male" : "Female"} </p>
              <p><strong>Date Of Birth:</strong> {moment(player.dateOfBirth).format('DD/MM/YYYY')}</p>
              <p><strong>Location:</strong> {player.city ? TitleCase(player.city.toString()): 'Undefined'} </p>
            </div>
          </div>
          <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Professional Info</h2>
            <div>
              <check><strong>Payment:</strong> {player.payment === 1 ? 'Paid' : 'Not Paid' }</check>
              <p><strong>Status:</strong> {player.status === 1 ? 'Active': 'Not Active'}</p>
              <p><strong>Details:</strong> {player.details}</p>
            </div>
          </div>
     
        </div>
      </div>
  )
}




PlayerProfile.propTypes = {
  getCurrentPlayer:PropTypes.func.isRequired,
  clearPlayer:PropTypes.func.isRequired,
  getAllPlayers:PropTypes.func.isRequired,
  deletePlayer:PropTypes.func.isRequired,
  player:PropTypes.object.isRequired,
  club:PropTypes.object.isRequired,
  team:PropTypes.object.isRequired
}

const mapStateToProps = (state, props) => ({
player:state.player,
club:state.club,
team:state.team
});

export default connect( mapStateToProps , { getCurrentPlayer, clearPlayer, getAllPlayers, deletePlayer } )(PlayerProfile);






