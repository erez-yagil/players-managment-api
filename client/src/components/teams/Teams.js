/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllTeams, deleteTeam, clearTeam } from '../../actions/teams'
import { connect } from 'react-redux';
import {AddTeamForm, EditTeamForm, AddPlayerToTeam} from './teamActions';

const TeamInfo = ({ team:{ teams }, getAllTeams, deleteTeam, clearTeam }) => {

  useEffect(() => {
    clearTeam();
    getAllTeams();
  }, []);
  

  return (
    <Fragment>
      <h2>Teams info</h2>
        <AddTeamForm />
      <br></br>
    <table className="table">
      <thead>
        <tr>
          <th>Team Name</th>
          <th>Team Number</th>
          <th>Teams</th>
          <th>players</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {teams.map( team => (
      
        <tr key={team._id}>
          <td>{team.teamName}</td>
          <td>{team.teamNum}</td>
          <td>{team._id}</td>
          <td></td>
          <td>
            <AddPlayerToTeam teamid={team._id}/>
          <EditTeamForm teamid={team._id}/>
          <button onClick={()=>deleteTeam(team._id)}>Delete</button>
          </td>
        </tr>
        ))}
    </tbody>
    </table>
    </Fragment>
  )
}

TeamInfo.propTypes = {
  getAllTeams:PropTypes.func.isRequired,
  deleteTeam:PropTypes.func.isRequired,
  clearTeam:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile :state.profile,
  team: state.team
});

export default connect( mapStateToProps , {getAllTeams, deleteTeam, clearTeam} )(TeamInfo);