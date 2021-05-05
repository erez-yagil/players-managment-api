/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreatePlayer from './players-Forms/createPlayer';
import {getCurrentTeam} from '../../actions/teams';
import Spinner from '../layout/spinner';


const AddPlayerPage = ({match, getCurrentTeam,  team:{ team }}) => {

  const teamId = match.params.id;

  useEffect(() => {
    getCurrentTeam(teamId)
  }, []);

  if (teamId) {
    return teamId === null ? <Spinner/> :
    (
      <Fragment>
        <h1 className="large">Add new player to team: {team.teamName}</h1>
         <CreatePlayer toTeam={true}/>
      </Fragment>
        )
  }
  
  return (
  <Fragment>
    <h1 className="large">Add new player</h1>
    <CreatePlayer />
  </Fragment>
  )
}



AddPlayerPage.propTypes = {
  getCurrentTeam:PropTypes.func.isRequired,
  team:PropTypes.object.isRequired
};

const mapStateToProps = state =>({
  team:state.team
});

export default connect(mapStateToProps, { getCurrentTeam })(AddPlayerPage)