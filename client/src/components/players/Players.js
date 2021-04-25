/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { getAllPlayers, deletePlayer, clearPlayer } from '../../actions/players'
import { AddPlayerForm, EditPlayerForm } from './PlayersActions';
import Spinner from '../layout/spinner';




const UserInfo = ({player: { players, loading }, getAllPlayers, deletePlayer, clearPlayer }) => {

useEffect(() => {
  clearPlayer();
  getAllPlayers();
  }, []);

  const users = players.map( player => (
    <tr key={player._id}>
      <td>{player.firstName}</td>
      <td>{player.lastName}</td>
      <td>{player.teamNum}</td>
      <td>{player.idNumber}</td>
      <td></td>
      <td></td>
      <td></td>

      <td>
        <EditPlayerForm />
        <button onClick={() => deletePlayer(player._id)}>Delete User</button>
        </td>
    </tr>  
   ));
  
  return loading && players === null ? <Spinner /> :
  (
    <Fragment>
    <h2>Players info</h2>
    <AddPlayerForm />
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
  deletePlayer:PropTypes.func.isRequired,
  getAllPlayers:PropTypes.func.isRequired,
  clearPlayer:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  player: state.player
});

export default connect( mapStateToProps , {deletePlayer, getAllPlayers, clearPlayer} )(UserInfo);